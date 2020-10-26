local isNumber = require "./is-number"

return {
    assertIsNumber = function(a)
        assert(isNumber(a))
    end
}
