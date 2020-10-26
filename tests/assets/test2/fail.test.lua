
describe("Failures", function()

    test("to be", function()
        expect(2).toBe(4)
    end)

    test("to be truthy", function()
        expect(false).toBeTruthy()
    end)

    test("to be falsy", function()
        expect(true).toBeFalsy()
    end)

    test("not to be falsy", function()
        expect(false).toNot.toBeFalsy()
    end)

    test("to be nil", function()
        expect(true).toBeNil()
    end)

    test("not to be nil", function()
        expect(nil).toNot.toBeNil()
    end)

    test("tables equal", function()
        expect({
            text = "2",
            number = 2,
            subtable = {
                a = true,
            },
        }).toEqual({
            text = "3",
            number = 2,
            subtable = {
                a = true,
                b = false,
            },
        })
    end)

end)

