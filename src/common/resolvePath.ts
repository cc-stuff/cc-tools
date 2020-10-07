import * as path from 'path';

export function resolvePath(p: string, root: string = process.cwd()): string {
	return path.isAbsolute(p)
		? p
		: path.resolve(root, p);
}
