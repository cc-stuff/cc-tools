import {argv} from 'yargs';
import {assertIsString} from "./common/assertIsString";
import {assertIsNumber} from "./common/assertIsNumber";
import {run} from "./api";

const {fs: imageFile, folder, watch, port} = argv;

assertIsNumber(port);

try {
	assertIsString(imageFile);

	run({
		args: {
			fs: imageFile,
			watch: !!watch,
			port,
		}
	}).catch(console.error);
} catch (_) {
	assertIsString(folder);

	run({
		args: {
			folder,
			watch: !!watch,
			port,
		}
	}).catch(console.error);
}
