
describe("cctools.fn", function()

    local describeMock = cctools.fn()
    local beforeMock

    beforeAll(function()
        beforeMock = cctools.fn()
    end)

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

    test("mock in hook", function()
        describeMock(2)
        beforeMock(3)

        expect(describeMock.calls).toEqual({{2}})
        expect(beforeMock.calls).toEqual({{3}})
    end)

end)

