import * as assert from "assert";

export function assertIsString(a: unknown): asserts a is string {
	assert(typeof a === "string", `String expected, got ${typeof a}`);
}
