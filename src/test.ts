import {argv} from 'yargs';
import {test} from "./api";
import {assertIsString} from "./common/assertIsString";

const {project, testsGrep, suitsGrep} = argv;

assertIsString(project);

if (testsGrep !== undefined) {
	assertIsString(testsGrep);
}

if (suitsGrep !== undefined) {
	assertIsString(suitsGrep);
}

assertIsString(testsGrep);
assertIsString(suitsGrep);

const outputLines: string[] = [];

test({
	outputLines,
	args: {
		project,
		testsGrep,
		suitsGrep,
	},
}).then(() => {
	for (const line of outputLines) {
		process.stdout.write(line + "\n");
	}
}).catch(error => {
	for (const line of outputLines) {
		process.stdout.write(line + "\n");
	}

	console.error(error);
})
