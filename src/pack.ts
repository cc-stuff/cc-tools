import {argv} from 'yargs';
import {assertIsString} from "./common/assertIsString";
import {packImage} from "./api";

const {folder, output} = argv;

assertIsString(folder);
assertIsString(output);

packImage({
	args: {
		folder,
		output,
	}
});
