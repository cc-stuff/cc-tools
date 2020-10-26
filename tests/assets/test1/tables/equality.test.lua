
describe("Table equality", function()

    test("equal tables but different instances", function()
        expect({
            number = 2,
            string = "str",
            func = print,
            subtable = {
                exists = true,
            },
        }).toEqual({
            number = 2,
            string = "str",
            func = print,
            subtable = {
                exists = true,
            },
        })
    end)

    test("not equal tables 1", function()
        expect({}).toNot.toEqual({ number = 2 })
    end)

    test("not equal tables 2", function()
        expect({ number = 2 }).toNot.toEqual({})
    end)

    test("equal arrays", function()
        expect({1, 2, 3}).toEqual({1, 2, 3})
    end)

    test("not equal arrays", function()
        expect({1, 2, 3}).toNot.toEqual({1, 5})
    end)

end)

