import * as path from 'path';
import * as fs from 'fs';
import {argv} from 'yargs';
import * as assert from "assert";
import {formatFileSize} from "./common/formatFileSize";
import {assertIsString} from "./common/assertIsString";

interface Project {
	rootDir: string;
	files: Record<string, File>;
}

interface File {
	source: string;
	path: string;
	moduleName: string;
}

const bundleTemplate = (body, entryModuleName) => `
local __files__ = {}

local function __require__(name)
	return __files__[name]
end

local function __define__(name, impl)
	__files__[name] = impl()
end

${body}

__require__('${entryModuleName}')
`;

const defineTemplate = (name, content) => `
__define__('${name}', function ()
${content}
end)
`;

const requireTemplate = name => `__require__('${name}')`;

function requireFile(project: Project, parent: File, relativeFileName: string): File {
	const absPath = path.resolve(path.dirname(parent.path), relativeFileName) +
		(relativeFileName.endsWith('.lua') ? '' : '.lua');

	if (project.files[absPath]) {
		return project.files[absPath];
	}

	const file: File = {
		source: fs.readFileSync(absPath, 'utf-8'),
		path: absPath,
		moduleName: absPath.substring(project.rootDir.length).replace(/\\/g, '/'),
	}

	expandRequires(file, project);

	file.source = defineTemplate(file.moduleName, file.source);
	project.files[absPath] = file;

	return file;
}

function expandRequires(file: File, project: Project) {
	const regexp = /require\s+['"](.*)['"]/gmi;
	const result = [];
	let matches;
	let lastIndex = 0;

	while ((matches = regexp.exec(file.source)) !== null) {
		const requiredFile = requireFile(project, file, matches[1]);

		result.push(file.source.substring(lastIndex, matches.index));
		result.push(requireTemplate(requiredFile.moduleName));

		lastIndex = matches.index + matches[0].length;
	}

	result.push(file.source.substring(lastIndex));

	file.source = result.join('');
}

const {entry, output} = argv;

assertIsString(entry);
assertIsString(output);

const absEntry = path.isAbsolute(entry)
	? entry
	: path.resolve(process.cwd(), entry);

const project: Project = {
	rootDir: path.dirname(absEntry),
	files: {},
}

const headerFile: File = {
	source: '',
	path: path.resolve(project.rootDir, './__header__'),
	moduleName: '',
}

const entryFile = requireFile(project, headerFile, path.basename(absEntry));

const bundleSource = bundleTemplate(
	Object
		.values(project.files)
		.map(file => file.source)
		.join(''),
	entryFile.moduleName,
);

fs.writeFileSync(output, bundleSource, 'utf-8');

console.log('Out bundle: ', formatFileSize(fs.statSync(output).size));
