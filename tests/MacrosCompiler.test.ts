import {MacrosCompiler} from "../src/api/macros/MacrosCompiler";

describe("MacrosCompiler", () => {
	let compiler: MacrosCompiler;

	beforeEach(() => {
		compiler = new MacrosCompiler();
	});

	test("#define simple", () => {
		expect(compiler.compile(
`
#define PLATFORM "win32"

print(PLATFORM)
`
		)).toEqual(
			`


print("win32")
`
		);

	});

	test("#define with args", () => {
		expect(compiler.compile(
			`
#define SUMMARIZE(a, b) a + b

print(SUMMARIZE(1, 3))
`
		)).toEqual(
			`


print(1 + 3)
`
		);

	});

	test("#ifdef simple", () => {
		expect(compiler.compile(
			`
#define DEBUG

#ifdef DEBUG
print("debug")
#endif

#ifndef DEBUG
print("production")
#endif
`
		)).toEqual(
			`



print("debug")


`
		);

	});

	test("#ifdef complex", () => {
		expect(compiler.compile(
			`
#define DEBUG
#define MODE "unknown"

#ifdef DEBUG
	#define PLATFORM "win32"

	#ifdef PLATFORM
		#define VERSION 1
		#undef MODE
	#endif
#endif

#ifdef DEBUG
print(MODE, "debug", PLATFORM, VERSION)
#endif
`
		).replace(/[\r\n\t]/g, '')).toEqual(
			`print(MODE, "debug", "win32", 1)`
		);

	});

});
