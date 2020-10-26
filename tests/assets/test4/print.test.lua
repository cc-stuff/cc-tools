
describe("Print", function()

    test("print toSnapshot table", function()
        print(toSnapshot({
            number = 2,
            string = "str",
            func = print,
            subtable = {
                exists = true,
            },
        }))
    end)

    test("print toSnapshot array", function()
        print(toSnapshot({
            1, 2, 3, "some string",
        }))
    end)

end)

