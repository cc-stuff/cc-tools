
local function doStuff()
    print("Output from outside test")
end

describe("Print", function()

    beforeEach(function()
        print("works in a hook")
    end)

    test("print toSnapshot table", function()
        print(toSnapshot({
            number = 2,
            string = "str",
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

    test("print toSnapshot mixed", function()
        print(toSnapshot({
            1, 2, string = "str", 5
        }))
    end)

    test("print captures global output", function()
        doStuff()
        print.original("PRINT")
    end)

end)

