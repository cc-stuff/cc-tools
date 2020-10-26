
cctools = {}

cctools.start = function()
	local writeCommand = function(sCommand)
		local file = fs.open(".ccstatus", "w")
		file.write(sCommand)
		file.close()
	end

	cctools.finish = function()
		os.startTimer(1)
		os.pullEvent()
		writeCommand("ended")
	end

	writeCommand("started")
end

cctools.start()


local __files__ = {}

local function __require__(name)
	return __files__[name]
end

local function __define__(name, impl)
	__files__[name] = impl()
end


__define__('vendor/diff.lua', function ()
-----------------------------------------------------------------------------
-- Provides functions for diffing text.
--
-- (c) 2007, 2008  Yuri Takhteyev (yuri@freewisdom.org)
-- (c) 2007 Hisham Muhammad
--
-- License: MIT/X, see http://sputnik.freewisdom.org/en/License
-----------------------------------------------------------------------------

local SKIP_SEPARATOR = true  -- a constant

local IN = "[+]"
local OUT  = "[-]"
local SAME = "[=]"  -- token statuses

-----------------------------------------------------------------------------
-- Split a string into tokens.  (Adapted from Gavin Kistner's split on
-- http://lua-users.org/wiki/SplitJoin.
--
-- @param text           A string to be split.
-- @param separator      [optional] the separator pattern (defaults to any
--                       white space - %s+).
-- @param skip_separator [optional] don't include the sepator in the results.
-- @return               A list of tokens.
-----------------------------------------------------------------------------
local function split(text, separator, skip_separator)
    separator = separator or "%s+"
    local parts = {}
    local start = 1
    local split_start, split_end = text:find(separator, start)
    while split_start do
        table.insert(parts, text:sub(start, split_start-1))
        if not skip_separator then
            table.insert(parts, text:sub(split_start, split_end))
        end
        start = split_end + 1
        split_start, split_end = text:find(separator, start)
    end
    if text:sub(start)~="" then
        table.insert(parts, text:sub(start) )
    end
    return parts
end


-----------------------------------------------------------------------------
-- Derives the longest common subsequence of two strings.  This is a faster
-- implementation than one provided by stdlib.  Submitted by Hisham Muhammad.
-- The algorithm was taken from:
-- http://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Longest_common_subsequence
--
-- @param t1             the first string.
-- @param t2             the second string.
-- @return               the least common subsequence as a matrix.
-----------------------------------------------------------------------------
local function quick_LCS(t1, t2)
    local m = #t1
    local n = #t2

    -- Build matrix on demand
    local C = {}
    local setmetatable = setmetatable
    local mt_tbl = {
        __index = function(t, k)
            t[k] = 0
            return 0
        end
    }
    local mt_C = {
        __index = function(t, k)
            local tbl = {}
            setmetatable(tbl, mt_tbl)
            t[k] = tbl
            return tbl
        end
    }
    setmetatable(C, mt_C)
    local max = math.max
    for i = 1, m+1 do
        local ci1 = C[i+1]
        local ci = C[i]
        for j = 1, n+1 do
            if t1[i-1] == t2[j-1] then
                ci1[j+1] = ci[j] + 1
            else
                ci1[j+1] = max(ci1[j], ci[j+1])
            end
        end
    end
    return C
end



-----------------------------------------------------------------------------
-- Escapes an HTML string.
--
-- @param text           The string to be escaped.
-- @return               Escaped string.
-----------------------------------------------------------------------------
local function escape_html(text)
    text = text:gsub("&", "&amp;"):gsub(">","&gt;"):gsub("<","&lt;")
    text = text:gsub("\"", "&quot;")
    return text
end


-----------------------------------------------------------------------------
-- Formats an inline diff as HTML, with <ins> and <del> tags.
--
-- @param tokens         a table of {token, status} pairs.
-- @return               an HTML string.
-----------------------------------------------------------------------------
local function format_as_html(tokens)
    local diff_buffer = ""
    local token, status
    for i, token_record in ipairs(tokens) do
        token = escape_html(token_record[1])
        status = token_record[2]
        if status == "in" then
            diff_buffer = diff_buffer.."<ins>"..token.."</ins>"
        elseif status == "out" then
            diff_buffer = diff_buffer.."<del>"..token.."</del>"
        else
            diff_buffer = diff_buffer..token
        end
    end
    return diff_buffer
end

-----------------------------------------------------------------------------
-- Returns a diff of two strings as a list of pairs, where the first value
-- represents a token and the second the token's status ("same", "in", "out").
--
-- @param old             The "old" text string
-- @param new             The "new" text string
-- @param separator      [optional] the separator pattern (defaults ot any
--                       white space).
-- @return               A list of annotated tokens.
-----------------------------------------------------------------------------
local function diff(old, new, separator)
    assert(old); assert(new)
    new = split(new, separator); old = split(old, separator)

    -- First, compare the beginnings and ends of strings to remove the common
    -- prefix and suffix.  Chances are, there is only a small number of tokens
    -- in the middle that differ, in which case  we can save ourselves a lot
    -- in terms of LCS computation.
    local prefix = "" -- common text in the beginning
    local suffix = "" -- common text in the end
    while old[1] and old[1] == new[1] do
        local token = table.remove(old, 1)
        table.remove(new, 1)
        prefix = prefix..token
    end
    while old[#old] and old[#old] == new[#new] do
        local token = table.remove(old)
        table.remove(new)
        suffix = token..suffix
    end

    -- Setup a table that will store the diff (an upvalue for get_diff). We'll
    -- store it in the reverse order to allow for tail calls.  We'll also keep
    -- in this table functions to handle different events.
    local rev_diff = {
        put  = function(self, token, type) table.insert(self, {token,type}) end,
        ins  = function(self, token) self:put(token, IN) end,
        del  = function(self, token) self:put(token, OUT) end,
        same = function(self, token) if token then self:put(token, SAME) end end,
    }

    -- Put the suffix as the first token (we are storing the diff in the
    -- reverse order)

    rev_diff:same(suffix)

    -- Define a function that will scan the LCS matrix backwards and build the
    -- diff output recursively.
    local function get_diff(C, old, new, i, j)
        local old_i = old[i]
        local new_j = new[j]
        if i >= 1 and j >= 1 and old_i == new_j then
            rev_diff:same(old_i)
            return get_diff(C, old, new, i-1, j-1)
        else
            local Cij1 = C[i][j-1]
            local Ci1j = C[i-1][j]
            if j >= 1 and (i == 0 or Cij1 >= Ci1j) then
                rev_diff:ins(new_j)
                return get_diff(C, old, new, i, j-1)
            elseif i >= 1 and (j == 0 or Cij1 < Ci1j) then
                rev_diff:del(old_i)
                return get_diff(C, old, new, i-1, j)
            end
        end
    end
    -- Then call it.
    get_diff(quick_LCS(old, new), old, new, #old + 1, #new + 1)

    -- Put the prefix in at the end
    rev_diff:same(prefix)

    -- Reverse the diff.
    local diff = {}

    for i = #rev_diff, 1, -1 do
        table.insert(diff, rev_diff[i])
    end

    local bEquals = true

    for _, tDiffPair in ipairs(diff) do
        if (tDiffPair[2] ~= SAME) then
            bEquals = false
            break
        end
    end

    diff.to_html = format_as_html
    diff.equals = function() return bEquals end

    diff.toPureTable = function()
        local tResult = {}

        for _, tEntry in ipairs(diff) do
            table.insert(tResult, tEntry)
        end

        return tResult
    end

    return diff
end

return diff

end)

__define__('test-env.lua', function ()
local diff = __require__('vendor/diff.lua')

-- setfenv polyfill
if (type(setfenv) ~= "function") then
    print("Using setfenv polyfill ...")

    setfenv = function (f, tEnv)
        return load(string.dump(f), nil, nil, tEnv)
    end
end

-- http://lua-users.org/wiki/StringRecipes
local function stringEndsWith(str, ending)
    return ending == "" or str:sub(-#ending) == ending
end

function toSnapshot(aValue, ...)
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
                if (i == 1) then
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

            error("")
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
            context.assert(aValue == bValue, "expecting " .. tostring(aValue) .. " to be " .. tostring(bValue))
        end,

        toEqual = function(bValue)
            local tDiff = diff(toSnapshot(aValue), toSnapshot(bValue), "\n")

            context.assert(tDiff.equals(), "expecting values to match", tDiff)
        end,

        toBeTruthy = function(bValue)
            context.assert(not not aValue, "expecting " .. tostring(aValue) .. " to be truthy")
        end,

        toBeFalsy = function(bValue)
            context.assert(not aValue, "expecting " .. tostring(aValue) .. " to be falsy")
        end,

        toBeNil = function(bValue)
            context.assert(aValue == nil, "expecting " .. tostring(aValue) .. " to be nil")
        end,
    }

    -- Setting up the negated table
    setmetatable(tExpectResult, {
        __index = function(_, sKey)
            if (sKey == "toNot") then
                local tNegativeContext = createContext(context.suiteName, context.testName)
                local tResult = {}

                setmetatable(tResult, {
                    __index = function(_1, sNegativeKey)
                        if (sNegativeKey == "toNot") then
                            return nil
                        end

                        return function(bValue)
                            local bSuccess = pcall(expect(aValue, tNegativeContext)[sNegativeKey], bValue)
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
                                error("")
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
        local runAll = function(sHookName, t)
            for _, f in ipairs(t) do
                -- TODO: Async function?
                local bSuccess, sError = pcall(f)

                if (not bSuccess) then
                    local aTextColor = term.getTextColor()
                    term.setTextColor(colors.red)
                    print("Error in " .. sHookName .. ":", sError)
                    term.setTextColor(aTextColor)

                    table.insert(globalContext.output, {
                        suiteName = sName,
                        testName = sName .. "." .. sHookName,
                        fail = true,
                        text = sError,
                    })
                end

            end
        end

        local runTest = function(tTest)
            globalContext.totalTests = globalContext.totalTests + 1

            -- TODO: Async function?
            local bSuccess, sError = pcall(tTest.impl)

            if (not bSuccess) then
                globalContext.failedTests = globalContext.failedTests + 1

                if (not stringEndsWith(sError, " ")) then
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
            end

            -- Copying entries to the global context
            for _, tEntry in ipairs(tTest.context.output) do
                table.insert(globalContext.output, tEntry)
            end
        end

        -- Running suite setup
        runAll("beforeAll", tSuite.beforeAll)

        for _1, sName in ipairs(tArg) do
            for _2, tTest in ipairs(tSuite.tests) do
                if (tTest.name == sName) then
                    -- Running setup
                    runAll("beforeEach", tSuite.beforeEach)
                    -- Running the test
                    runTest(tTest)
                    -- Running teardown
                    runAll("afterEach", tSuite.afterEach)
                end
            end
        end

        -- Running suite teardown
        runAll("afterAll", tSuite.afterAll)
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
                end,

                print = function(...)
                    print("Print:", table.unpack(arg))

                    local text = ""

                    for i, aPart in ipairs(arg) do
                        text = text .. tostring(aPart)

                        if (i ~= #arg) then
                            text = text .. " "
                        end
                    end

                    table.insert(globalContext.output, {
                        suiteName = sName,
                        testName = sTestName,
                        fail = false,
                        print = true,
                        text = text,
                    })
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

end)

__define__('test-runner.lua', function ()
local testEnv = __require__('test-env.lua')

local tCommandFile = fs.open(".command.json", "r")
local sCommandRaw = tCommandFile.readAll()
tCommandFile.close()

local tCommand = textutils.unserializeJSON(sCommandRaw)

-- Initializing the tests
for _1, sFile in ipairs(tCommand.files) do
    print("Running tests in " .. sFile .. " ...")

    os.run({
        describe = describe,
        expect = expect,
    }, sFile)
end

-- Grep tests
local tSuiteNames = testEnv.grep(tCommand.suitsGrep, tCommand.testsGrep)

-- Run all matched tests
pcall(testEnv.run, tSuiteNames)

-- Write output to file
print("Finalizing...")

local tOutputFile = fs.open(".output.json", "w")
tOutputFile.write(testEnv.globalContext.toJSON())
tOutputFile.close()

print("Done")

-- Close the emulator
cctools.finish();

end)


__require__('test-runner.lua')

