local diff = require "./vendor/diff"

-- setfenv polyfill
if (type(setfenv) ~= "function") then
    print("Using setfenv polyfill ...")

    setfenv = function (f, tEnv)
        return load(string.dump(f), nil, nil, tEnv)
    end
end

local function toSnapshot(aValue, ...)
    local aResult = ""

    if (type(aValue) == "nil") then
        aResult = "nil"
    elseif (type(aValue) == "boolean") then
        aResult = aValue and "true" or "false"
    elseif (type(aValue) == "string") then
        aResult = '"' .. aValue .. '"'
    elseif (
        (type(aValue) == "function") or
        (type(aValue) == "number") or
        (type(aValue) == "userdata") or
        (type(aValue) == "thread")
    ) then
        aResult = tostring(aValue)
    elseif (type(aValue) == "table") then
        local tKeys = {}
        local tResultLines = {}

        -- Reading all keys from the table
        for sKey in pairs(aValue) do
            table.insert(tKeys, sKey)
        end

        -- Sorting keys alphabetically
        table.sort(tKeys)

        table.insert(tResultLines, "{")

        for _, sKey in ipairs(tKeys) do
            -- Inserting new line with key/value
            local tValueLines = toSnapshot(aValue[sKey], true)

            for i, sValueLine in ipairs(tValueLines) do
                if (i == 1) then
                    table.insert(tResultLines, '\t"' .. sKey .. '" = ' .. sValueLine)
                else
                    table.insert(tResultLines, "\t" .. sValueLine)
                end
            end
        end

        table.insert(tResultLines, "}")

        aResult = tResultLines
    end

    if (arg[1]) then -- If we need to return a list of strings
        if (type(aResult) == "string") then
            return { aResult }
        else
            return aResult
        end
    else -- If we need to return a string
        if (type(aResult) == "string") then
            return aResult
        else
            local sResult = ""

            for i, sLine in ipairs(aResult) do
                if (i == i) then
                    sResult = sLine
                else
                    sResult = sResult .. "\n" .. sLine
                end
            end

            return sResult
        end
    end
end

local function createContext(sSuiteName, sTestName)
    local context = {
        suiteName = sSuiteName,
        testName = sTestName,
        totalTests = 0,
        failedTests = 0,
        output = {}
    }

    context.toJSON = function()
        return textutils.serializeJSON({
            suiteName = context.suiteName,
            testName = context.testName,
            totalTests = context.totalTests,
            failedTests = context.failedTests,
            output = context.output,
        })
    end

    context.assert = function (bExpression, sText, ...)
        local tDiffList = arg[1]

        local tEntry = {
            suiteName = sSuiteName,
            testName = sTestName,
            text = sText,
            fail = false,
        }

        if (type(tDiffList) == "table") then
            tEntry.diff = tDiffList.toPureTable()
        end

        if (not bExpression) then
            tEntry.fail = true

            table.insert(context.output, tEntry)

            error(sText)
        end

        table.insert(context.output, tEntry)
    end

    return context
end

local globalContext = createContext("", "")
local testSuites = {}

function expect(aValue, ...)
    local context = arg[1] or globalContext

    local tExpectResult = {
        toBe = function(bValue)
            context.assert(aValue == bValue, tostring(aValue) .. " to be " .. tostring(bValue))
        end,

        toEqual = function(bValue)
            local tDiff = diff(toSnapshot(aValue), toSnapshot(bValue))

            context.assert(tDiff.equals(), "values to match", tDiff)
        end,

        toBeTruthy = function(bValue)
            context.assert(not not aValue, tostring(aValue) .. " to be truthy")
        end,

        toBeFalsy = function(bValue)
            context.assert(not aValue, tostring(aValue) .. " to be falsy")
        end,

        toBeNil = function(bValue)
            context.assert(aValue == nil, tostring(aValue) .. " to be nil")
        end,
    }

    -- Setting up the negated table
    setmetatable(tExpectResult, {
        __index = function(_, sKey)
            if (sKey == "toNot") then
                local tNegativeContext = createContext(context.suiteName, context.testName)
                local tResult = {}

                setmetatable(tResult, {
                    __index = function(_, sNegativeKey)
                        if (sKey == "not") then
                            return nil
                        end

                        return function(aValue)
                            local bSuccess = pcall(expect(tNegativeContext)[sNegativeKey], aValue)
                            local sLastText = ""

                            for _, tEntry in ipairs(tNegativeContext.output) do
                                -- Negating the results of all the checks
                                tEntry.fail = not tEntry.fail
                                tEntry.text = "not " .. tEntry.text
                                sLastText = tEntry.text

                                table.insert(context.output, tEntry)
                            end

                            -- We should negate the result, so success means failure
                            if (bSuccess) then
                                error(sLastText)
                            end
                        end
                    end
                })

                return tResult
            end

            return rawget(_, sKey)
        end
    })

    return tExpectResult
end

function describe(sName, fImpl)
    local tSuite = {
        name = sName,

        beforeAll = {},
        beforeEach = {},
        afterEach = {},
        afterAll = {},

        tests = {},
    }

    tSuite.grep = function(sMatch)
        local tMatchedNames = {}

        print("Total tests in suite: " ..tostring(#tSuite.tests))

        for _, tTest in ipairs(tSuite.tests) do
            if (string.match(tTest.name, sMatch)) then
                table.insert(tMatchedNames, tTest.name)
            end
        end

        return tMatchedNames
    end

    tSuite.run = function(tArg)
        local runAll = function(t)
            for _, f in ipairs(t) do
                -- TODO: Async function?
                pcall(f)
            end
        end

        local runTest = function(tTest)
            globalContext.totalTests = globalContext.totalTests + 1

            -- TODO: Async function?
            local bSuccess, sError = pcall(tTest.impl)

            if (not bSuccess) then
                globalContext.failedTests = globalContext.failedTests + 1

                local aTextColor = term.getTextColor()
                term.setTextColor(colors.red)
                print("Error in test:", sError)
                term.setTextColor(aTextColor)

                table.insert(globalContext.output, {
                    suiteName = sName,
                    testName = tTest.name,
                    fail = true,
                    text = sError,
                })
            end

            -- Copying entries to the global context
            for _, tEntry in ipairs(tTest.context.output) do
                table.insert(globalContext.output, tEntry)
            end
        end

        -- Running suite setup
        runAll(tSuite.beforeAll)

        for _1, sName in ipairs(tArg) do
            for _2, tTest in ipairs(tSuite.tests) do
                if (tTest.name == sName) then
                    -- Running setup
                    runAll(tSuite.beforeEach)
                    -- Running the test
                    runTest(tTest)
                    -- Running teardown
                    runAll(tSuite.beforeEach)
                end
            end
        end

        -- Running suite teardown
        runAll(tSuite.afterAll)
    end

    local tTestEnv = {
        beforeAll = function(f)
            table.insert(tSuite.beforeAll, f)
        end,

        beforeEach = function(f)
            table.insert(tSuite.beforeEach, f)
        end,

        afterEach = function(f)
            table.insert(tSuite.afterEach, f)
        end,

        afterAll = function(f)
            table.insert(tSuite.afterAll, f)
        end,

        test = function(sTestName, fTestImpl)
            -- Creating separate context so that each expect would be connected to it's suite and test
            local tTestContext = createContext(sName, sTestName)

            local tTestConcreteEnv = {
                expect = function(aValue)
                    return expect(aValue, tTestContext)
                end
            }

            setmetatable(tTestConcreteEnv, {
                __index = _ENV
            })

            setfenv(fTestImpl, tTestConcreteEnv)

            table.insert(tSuite.tests, {
                name = sTestName,
                context = tTestContext,
                impl = fTestImpl
            })
        end,
    }

    setmetatable(tTestEnv, {
        __index = _ENV
    })

    setfenv(fImpl, tTestEnv)
    pcall(fImpl)

    table.insert(testSuites, tSuite)
end

local function grep(sSuiteMatch, sTestMatch)
    print("Looking for suites that match " .. sSuiteMatch)

    local tMatches = {}
    local nSuiteCount = 0
    local nTestCount = 0

    for _, tSuite in ipairs(testSuites) do
        if (string.match(tSuite.name, sSuiteMatch)) then
            print("Looking for tests that match " .. sTestMatch)
            nSuiteCount = nSuiteCount + 1

            local tMatchedTestNames = tSuite.grep(sTestMatch)
            nTestCount = nTestCount + #tMatchedTestNames

            table.insert(tMatches, { tSuite.name, tMatchedTestNames })
        end
    end

    print("Found " .. tostring(nSuiteCount) .. " suites with " .. tostring(nTestCount) .. " tests")

    return tMatches
end

local function run(tArg)
    for _1, tSuiteTestsPair in ipairs(tArg) do
        local sName, tTestNames = table.unpack(tSuiteTestsPair)

        for _2, tSuite in ipairs(testSuites) do
            if (tSuite.name == sName) then
                -- Running the tests in this suite
                tSuite.run(tTestNames)
            end
        end
    end
end

return {
    globalContext = globalContext,
    grep = grep,
    run = run,
}
