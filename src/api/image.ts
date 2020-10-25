import * as path from 'path';
import * as fs from 'fs-extra';
import {formatFileSize} from "../common/formatFileSize";
import {assertIsString} from "../common/assertIsString";
import {resolvePath} from "../common/resolvePath";

interface FSNodeAttributes {
	creation: number;
	modification: number;
}

interface FSNode {
	attributes: FSNodeAttributes;
}

interface FSFile extends FSNode {
	b64: string;
}

interface FSDirectory extends FSNode {
	children: string[];
}

interface Image {
	[key: string]: FSFile | FSDirectory;
}

function readDir(rootDir: string, dir: string, outImage: Image): string[] {
	const files = fs.readdirSync(path.resolve(rootDir, dir));

	for (const fileName of files) {
		const relFileName = `${dir}/${fileName}`;
		const absFileName = path.resolve(rootDir, relFileName);
		const fileKey = `computer[0].files[${relFileName.slice(2)}]`;

		const fileStats = fs.statSync(absFileName);

		const attributes = {
			creation: Date.now(),
			modification: Date.now(),
		}

		if (fileStats.isDirectory()) {
			const childFiles = readDir(rootDir, relFileName, outImage);

			outImage[fileKey] = {
				attributes,
				children: childFiles,
			}
		} else {
			outImage[fileKey] = {
				attributes,
				b64: fs.readFileSync(absFileName).toString("base64"),
			}
		}
	}

	return files;
}

function flattenImage(image: Image): [string, string][] {
	const result = [];

	for (const key of Object.keys(image)) {
		const entry = image[key];

		result.push([`${key}.attributes`, JSON.stringify(entry.attributes)]);

		if ((entry as FSDirectory).children) {
			result.push([`${key}.children`, JSON.stringify((entry as FSDirectory).children)]);
		} else {
			result.push([`${key}.b64`, JSON.stringify((entry as FSFile).b64)]);
		}
	}

	return result;
}

function writeImage(flat: [string, string][], outDir: string): number {
	let extractedCount = 0;

	for (const entry of flat) {
		const [key, value] = entry;

		const fileName = /^computer\[0]\.files\[(.*)]/.exec(key)[1];
		const fileNameAbs = resolvePath(fileName, outDir);

		// Forcing the path
		fs.mkdirpSync(path.dirname(fileNameAbs));

		// Creating a file
		if (key.endsWith(".b64")) {
			console.log(`Extracting ${fileNameAbs}`);

			fs.writeFileSync(fileNameAbs, Buffer.from(value, "base64").toString("utf-8"));
			extractedCount++;
		}
	}

	return extractedCount;
}

export interface PackImageOptions {
	args?: {
		folder: string;
		output: string;
	}
}

export function packImage(options: PackImageOptions) {
	const {folder, output} = options.args;

	assertIsString(folder);
	assertIsString(output);

	const rootDir = resolvePath(folder);

	if (fs.existsSync(output)) {
		fs.unlinkSync(output);
	}

	const image: Image = {};

	image["computer[0].files[]"] = {
		attributes: {
			creation: 0,
			modification: 0,
		},
		children: readDir(rootDir, ".", image),
	}

	fs.writeFileSync(output, JSON.stringify(flattenImage(image)), "utf-8");

	console.log('Out image: ', formatFileSize(fs.statSync(output).size));
}

export interface UnpackImageOptions {
	args?: {
		fs: string;
		output: string;
	}
}

export function unpackImage(options: UnpackImageOptions) {
	const {fs: imageFile, output} = options.args;

	assertIsString(imageFile);
	assertIsString(output);

	const imageFileAbs = resolvePath(imageFile);
	const outputAbs = resolvePath(output);

	const flatImage: [string, string][] = JSON.parse(fs.readFileSync(imageFileAbs, "utf-8"));

	const extractedCount = writeImage(flatImage, outputAbs);

	console.log('Extracted files: ', extractedCount);
}