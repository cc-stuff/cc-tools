import * as assert from "assert";

export function assertIsNumber(a: unknown): asserts a is number {
	assert(typeof a === "number", `Number expected, got ${typeof a}`);
}
