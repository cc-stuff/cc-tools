import {MacrosParser} from "../src/api/macros/MacrosParser";

describe("MacrosParser", () => {
	class TestMacrosParser extends MacrosParser {
		ondefine = jest.fn();
		onend = jest.fn();
		onendif = jest.fn();
		onifdef = jest.fn();
		onifndef = jest.fn();
		onundef = jest.fn();
	}

	let parser: TestMacrosParser;

	beforeEach(() => {
		parser = new TestMacrosParser();
	})

	test("#define simple", () => {
		parser.consumeString("#define true false\na == true");

		expect(parser.ondefine.mock.calls).toEqual([
			[0, 18, "true", [], "false"],
		]);
	});

	test("#define with args", () => {
		parser.consumeString("#define map(x, y) [x, y]\nmap(13, 27)");

		expect(parser.ondefine.mock.calls).toEqual([
			[0, 24, "map", ["x", "y"], "[x, y]"],
		]);
	});

	test("#ifdef", () => {
		parser.consumeString("#ifdef PLATFORM");

		expect(parser.onifdef.mock.calls).toEqual([
			[0, 15, "PLATFORM"],
		]);
	});

	test("#ifndef", () => {
		parser.consumeString("#ifndef PLATFORM_2");

		expect(parser.onifndef.mock.calls).toEqual([
			[0, 18, "PLATFORM_2"],
		]);
	});

	test("#undef", () => {
		parser.consumeString("#undef PLATFORM");

		expect(parser.onundef.mock.calls).toEqual([
			[0, 15, "PLATFORM"],
		]);
	});

});
