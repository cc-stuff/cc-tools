
describe("Traceback in suite", function()

    error("Custom error in suite")

end)

describe("Traceback in hooks", function()

    beforeAll(function()
        error("Custom error in beforeAll")
    end)

    beforeEach(function()
        error("Custom error in beforeEach")
    end)

    afterEach(function()
        error("Custom error in afterEach")
    end)

    afterAll(function()
        error("Custom error in afterAll")
    end)

    test("dummy", function()
    end)

end)

describe("Traceback in test", function()

    test("traceback", function()
        error("Custom error in test")
    end)

end)

