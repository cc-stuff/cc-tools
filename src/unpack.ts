import {argv} from 'yargs';
import {assertIsString} from "./common/assertIsString";
import {unpackImage} from "./api";

const {fs, output} = argv;

assertIsString(fs);
assertIsString(output);

unpackImage({
	args: {
		fs,
		output,
	}
});
