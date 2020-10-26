import * as fse from 'fs-extra';

export function clearDist(path: string) {
	if (fse.statSync(path).isDirectory()) {
		fse.emptyDirSync(path);
	} else {
		fse.unlinkSync(path);
	}
}
