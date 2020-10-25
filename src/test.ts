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

test({
	args: {
		project,
		testsGrep,
		suitsGrep,
	},
}).then(output => {
	for (const line of output) {
		process.stdout.write(line + "\n");
	}
}).catch(error => {
	console.error(error);
})
