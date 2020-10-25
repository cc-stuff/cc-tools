
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
        expect({}).toEqual({ number = 2 })
    end)

    test("not equal tables 2", function()
        expect({ number = 2 }).toEqual({})
    end)

end)

