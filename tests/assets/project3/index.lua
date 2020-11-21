--#define PLATFORM_WIN32
--#define PRETTY_PRINT(__s__) "Pretty print: " .. tostring(__s__) .. "\n"

local platform = require "./platform/index"

platform.print(PRETTY_PRINT("It works!"))
