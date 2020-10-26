import {bundleProject} from "./project";
import {resolvePath} from "../common/resolvePath";
import * as fs from "fs-extra";
import * as path from "path";
import {glob} from "glob";
import * as colors from "colors/safe"
import {run} from "./runner";

interface TestProject {
	testMatch?: string[];
}

enum TestDiffTokenStatus {
	In = "[+]",
	Out = "[-]",
	Same = "[=]",
}

type TestDiff = [string, TestDiffTokenStatus][];

interface TestOutputEntry {
	suiteName: string;
	testName: string;
	text: string;
	fail: boolean;
	diff?: TestDiff;
}

type TestOutput = TestOutputEntry[];

interface TestResultContext {
	totalTests: number;
	failedTests: number;
	output: TestOutput;
}

export interface TestOptions {
	outputLines?: string[];
	args?: {
		project: string;
		testsGrep?: string;
		suitsGrep?: string;
	}
}

function randomPort(): number {
	return 5000 + Math.round(Math.random() * 5000);
}

function displayTests(output: TestOutput, result: string[]): string[] {
	const bySuite: Record<string, Record<string, TestOutputEntry[]>> = {};

	for (const entry of output) {
		const byTest = bySuite[entry.suiteName] = bySuite[entry.suiteName] ?? {};
		const testOutputEntries = byTest[entry.testName] = byTest[entry.testName] ?? [];

		testOutputEntries.push(entry);
	}

	const bySuiteKeys = Object.keys(bySuite).sort();

	for (const suiteName of bySuiteKeys) {
		const byTestKeys = Object.keys(bySuite[suiteName]).sort();

		const suiteStartIndex = result.length;
		let failed = false;

		result.push(colors.bgGreen(colors.white("PASS")) + " " + colors.green(suiteName));

		for (const testName of byTestKeys) {
			const entries = bySuite[suiteName][testName];

			for (const entry of entries) {
				// TODO: Output levels
				if (entry.fail) {
					failed = true;

					result.push(colors.bold(colors.red(`    • ${testName}`)));
					result.push(colors.red(entry.text));
					result.push("");

					if (entry.diff) {
						for (const [line, status] of entry.diff) {
							switch (status) {
								case TestDiffTokenStatus.In:
									result.push(colors.green(status + " " + line));
									break;

								case TestDiffTokenStatus.Out:
									result.push(colors.red(status + " " + line));
									break;

								case TestDiffTokenStatus.Same:
									result.push(line);
									break;
							}
						}
					}
				}
			}

			if (failed) {
				result[suiteStartIndex] = (colors.bgRed(colors.white("FAIL")) + " " + colors.red(suiteName));
			}
		}
	}

	return result;
}

export async function test(options: TestOptions) {
	const projectAbs = resolvePath(options.args.project);
	const projectRoot = path.dirname(projectAbs);
	let outputLines: string[] = options.outputLines ?? [];

	// Loading project json
	const testProject: TestProject = JSON.parse(fs.readFileSync(projectAbs, "utf-8"));

	if (!Array.isArray(testProject.testMatch)) {
		throw new Error("No tests found! Please ensure that your project file contains a valid \"testMatch\" section.");
	}

	const startupFileName = path.join(projectRoot, "startup.lua");
	const commandFileName = path.join(projectRoot, ".command.json");
	const outputFileName = path.join(projectRoot, ".output.json");
	const statusFileName = path.join(projectRoot, ".ccstatus");

	if (fs.existsSync(startupFileName)) {
		throw new Error("No startup.lua in tests root allowed.")
	}

	const filesToDeleteAbs: string[] = [startupFileName, commandFileName, outputFileName, statusFileName];
	const filesWithTests: string[] = [];

	// Helper to remove temporary bundles
	function removeTempBundles() {
		for (const fileAbs of filesToDeleteAbs) {
			try {
				fs.unlinkSync(fileAbs);
			} catch (e) {
				console.error(e);
			}
		}
	}

	// Scanning for test files
	try {
		for (const match of testProject.testMatch) {
			const files = glob.sync(match, {cwd: projectRoot});

			// Globbing all the test files and building each and every near the original
			for (const entry of files) {
				const entryAbs = resolvePath(entry, projectRoot);
				const entryOut = entryAbs + ".tmp.bundle";

				filesToDeleteAbs.push(entryOut);
				filesWithTests.push(entryOut.replace(projectRoot, ""))

				bundleProject({
					args: {
						entry: resolvePath(entry, projectRoot),
						output: entryOut,
					}
				});
			}
		}

		// Preparing startup bundle
		bundleProject({
			args: {
				entry: resolvePath("../assets/test-runner.lua", __dirname),
				output: startupFileName,
			}
		});

		// Writing command.json
		fs.writeFileSync(commandFileName, JSON.stringify({
			suitsGrep: options.args.suitsGrep ?? ".*",
			testsGrep: options.args.testsGrep ?? ".*",
			files: filesWithTests,
		}));

		// Running tests
		const instance = await run({
			args: {
				folder: projectRoot,
				port: randomPort(),
			}
		});

		// Waiting for tests to end
		await instance.waitForStatus("ended");

		// Stopping the test instance
		await instance.stop();

		// Reading output.json
		const testResultRaw = fs.readFileSync(outputFileName, "utf-8");
		const testResult: TestResultContext = new Function("return " + testResultRaw)();

		if (testResult.totalTests === 0) {
			throw new Error("No tests found.");
		}

		// No failures, just display all run tests grouped by suite
		outputLines = displayTests(testResult.output, outputLines);

		outputLines.push("");
		outputLines.push(`Total tests: ${testResult.totalTests}`);
		outputLines.push(`Failed tests: ${testResult.failedTests}`);

		if (testResult.failedTests > 0) {
			throw new Error(`${testResult.failedTests} tests failed.`);
		}
	} catch (error) {
		removeTempBundles();

		throw error;
	}

	removeTempBundles();
}
