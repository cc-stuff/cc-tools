import {test as runTest} from "../src/api";

describe("test", () => {

	test("run all tests", async () => {
		const outputLines = [];
		let error;

		try {
			await runTest({
				outputLines,
				args: {
					project: "./tests/assets/test1/project.json",
				}
			});
		} catch (err) {
			error = err;
			console.error(err);
		}

		expect(outputLines).toMatchSnapshot();
		expect(error).toMatchSnapshot();
	});

	test("run all tests that fail", async () => {
		const outputLines = [];
		let error;

		try {
			await runTest({
				outputLines,
				args: {
					project: "./tests/assets/test2/project.json",
				}
			});
		} catch (err) {
			error = err;
			console.error(err);
		}

		expect(outputLines).toMatchSnapshot();
		expect(error).toMatchSnapshot();
	});

	test("run tests with hooks", async () => {
		const outputLines = [];
		let error;

		try {
			await runTest({
				outputLines,
				args: {
					project: "./tests/assets/test3/project.json",
				}
			});
		} catch (err) {
			error = err;
			console.error(err);
		}

		expect(outputLines).toMatchSnapshot();
		expect(error).toMatchSnapshot();
	});

});
