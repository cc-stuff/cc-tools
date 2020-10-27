
describe("cctools.fn", function()

    test("without implementation", function()
        local fMock = cctools.fn()

        fMock()
        fMock("string arg")
        fMock(1, 2, 3, 4, 5)

        expect(fMock.calls).toEqual({
            {},
            {"string arg"},
            {1, 2, 3, 4, 5},
        })
    end)

    test("with implementation", function()
        local fMock = cctools.fn(function() return "mexicali" end)

        expect(fMock("where")).toBe("mexicali")
        expect(fMock.calls).toEqual({{"where"}})
    end)

    test("with clear", function()
        local fMock = cctools.fn(function() return "mexicali" end)

        fMock(1)
        fMock(2)
        fMock(3)

        fMock.clear()

        expect(fMock.calls).toEqual({})
    end)

end)

