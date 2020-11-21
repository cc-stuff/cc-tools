--#ifdef PLATFORM_WIN32
local platform = require "./win32"
--#endif

--#ifdef PLATFORM_MACOS
local platform = require "./macos"
--#endif

return platform
