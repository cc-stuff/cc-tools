
describe("Hooks", function()
    local beforeAllCalled = 0
    local beforeEachCalled = 0

    beforeAll(function()
        beforeAllCalled = beforeAllCalled + 1
    end)

    beforeEach(function()
        beforeEachCalled = beforeEachCalled + 1
    end)

    test("before hooks", function()
        expect(beforeAllCalled).toBe(1)
        expect(beforeEachCalled).toBe(1)
    end)

end)

