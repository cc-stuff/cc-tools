import * as path from 'path';
import * as fs from 'fs';
import {argv} from 'yargs';
import {formatFileSize} from "./common/formatFileSize";
import {assertIsString} from "./common/assertIsString";
import {resolvePath} from "./common/resolvePath";

interface CCBundleConfig {
	entry: string;
	output: string;
	references?: Record<string, string>;
}

interface Project {
	config: CCBundleConfig;
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
		moduleName: path
			.relative(project.rootDir, absPath)
			.replace(/\\/g, "/"),
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

function bundleProject(projectFile: unknown, entryArg?: unknown, outputArg?: unknown) {
	// Creating project
	const project: Project = {
		config: {
			entry: "",
			output: "",
		},
		rootDir: process.cwd(),
		files: {},
	}

	// Loading the config from the file
	if (typeof projectFile === "string") {
		const projectFileAbs = resolvePath(projectFile);
		const projectRoot = path.dirname(projectFileAbs);

		project.config = JSON.parse(fs.readFileSync(projectFileAbs, "utf-8"));
		project.config.entry = resolvePath(project.config.entry, projectRoot);
		project.config.output = resolvePath(project.config.output, projectRoot);

		project.rootDir = path.dirname(project.config.entry);
	} else {
		assertIsString(entryArg);
		assertIsString(outputArg);

		project.config.entry = resolvePath(entryArg);
		project.config.output = resolvePath(outputArg);
	}

	// Header stub file
	const headerFile: File = {
		source: '',
		path: path.resolve(project.rootDir, './__header__'),
		moduleName: '',
	}

	// Requiring entry file
	const entryFile = requireFile(project, headerFile, path.basename(project.config.entry));

	// Creating bundle source
	const bundleSource = bundleTemplate(
		Object
			.values(project.files)
			.map(file => file.source)
			.join(''),
		entryFile.moduleName,
	);

	// Writing bundle to file
	fs.writeFileSync(project.config.output, bundleSource, 'utf-8');

	// Bundle size info
	console.log(
		`[${path.basename(project.config.output)}] Out bundle: `,
		formatFileSize(fs.statSync(project.config.output).size),
	);

	// Bundling child projects
	if (project.config.references) {
		for (let reference of Object.values(project.config.references)) {
			reference = resolvePath(reference, project.rootDir);

			bundleProject(reference);
		}
	}
}

const {project, entry, output} = argv;

bundleProject(project, entry, output);
