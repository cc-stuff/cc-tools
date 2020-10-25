local testEnv = require "./test-env"

local tCommandFile = fs.open(".command.json", "r")
local sCommandRaw = tCommandFile.readAll()
tCommandFile.close()

local tCommand = textutils.unserializeJSON(sCommandRaw)

-- Initializing the tests
for _1, sFile in ipairs(tCommand.files) do
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
local tOutputFile = fs.open(".output.json", "w")
tOutputFile.write(textutils.serializeJSON(testEnv.globalContext))
tOutputFile.close()

-- Close the emulator
cctools.finish();
