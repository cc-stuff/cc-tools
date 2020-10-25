
describe("Basic", function()

    test("to be", function()
        expect(2).toBe(2)
    end)

    test("to be truthy", function()
        expect(2).toBeTruthy()
    end)

    test("not to be falsy", function()
        expect(2).toNot.toBeFalsy()
    end)

end)

