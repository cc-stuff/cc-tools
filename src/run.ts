import {argv} from 'yargs';
import {assertIsString} from "./common/assertIsString";
import {assertIsNumber} from "./common/assertIsNumber";
import {run} from "./api";

const {fs: imageFile, watch, port} = argv;

assertIsString(imageFile);
assertIsNumber(port);

run({
	args: {
		fs: imageFile,
		watch: !!watch,
		port,
	}
}).catch(console.error);
