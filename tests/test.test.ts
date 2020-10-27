import {test as runTest} from "../src/api";

describe("test", () => {

	async function doRunTest(name: string) {
		const outputLines = [];
		let error;

		try {
			await runTest({
				outputLines,
				args: {
					project: `./tests/assets/${name}/project.json`,
				}
			});
		} catch (err) {
			error = err;
			console.error(err);
		}

		expect(outputLines).toMatchSnapshot();
		expect(error).toMatchSnapshot();
	}

	test("run all tests", async () => {
		await doRunTest("test1");
	});

	test("run all tests that fail", async () => {
		await doRunTest("test2");
	});

	test("run tests with hooks", async () => {
		await doRunTest("test3");
	});

	test("run tests with print", async () => {
		await doRunTest("test4");
	});

	test("run tests with traceback", async () => {
		await doRunTest("test5");
	});

	test("run tests with cctools", async () => {
		await doRunTest("test6");
	});

});
