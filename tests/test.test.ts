import {test as runTest} from "../src/api";

describe("test", () => {

	test("run all tests", async () => {
		const output = await runTest({
			args: {
				project: "./tests/assets/test1/project.json",
			}
		})

		expect(output).toMatchSnapshot();
	});
});
