local calc = require "./calc"

describe("calc", function()

    beforeAll(function()
        print("Ran before all")
    end)

    beforeEach(function()
        print("Ran before each")
    end)

    afterEach(function()
        print("Ran after each")
    end)

    afterAll(function()
        print("Ran after all")
    end)

    test("adds positive numbers", function()
        expect(calc.add(5, 2)).toBe(7)
    end)

    test("adds negative numbers", function()
        expect(calc.add(5, -2)).toBe(3)
    end)

end)
