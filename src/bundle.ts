import {argv} from 'yargs';
import {bundleProject} from "./api";
import {assertIsString} from "./common/assertIsString";

const {project, entry, output} = argv;

try {
	assertIsString(project);

	bundleProject({
		projectFile: project,
	});
} catch (_) {
	assertIsString(entry)
	assertIsString(output)

	bundleProject({
		args: {
			entry,
			output,
		}
	});
}
