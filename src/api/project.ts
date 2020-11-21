import * as path from 'path';
import * as fs from 'fs';
import {formatFileSize} from "../common/formatFileSize";
import {assertIsString} from "../common/assertIsString";
import {resolvePath} from "../common/resolvePath";
import {MacrosCompiler} from "./macros/MacrosCompiler";

interface CCBundleConfig {
	entry: string;
	output: string;
	references?: Record<string, string>;
}

interface Project {
	config: CCBundleConfig;
	rootDir: string;
	files: Record<string, File>;
	bundleStream: BundleStream;
	macrosCompiler: MacrosCompiler;
}

interface File {
	source: string;
	path: string;
	moduleName: string;
}

const bundleTemplate = (body, entryModuleName) => `
local __files__ = {}

local function __require__(sName)
	local moduleInfo = __files__[sName]

	if (not moduleInfo) then
		error("Module not found: " .. tostring(sName))
	end

	return moduleInfo[2]
end

local function __define__(nLine, sName, fImpl)
	local function strSplit(sStr, sDelimiter)
		local tResult = {}
		local nFrom = 1
		local nDelimFrom, nDelimTo = string.find(sStr, sDelimiter, nFrom)

		while nDelimFrom do
			table.insert(tResult, string.sub(sStr, nFrom, nDelimFrom - 1))
			nFrom = nDelimTo + 1
			nDelimFrom, nDelimTo = string.find(sStr, sDelimiter, nFrom)
		end

		table.insert(tResult, string.sub(sStr, nFrom))

		return tResult
	end

	local function strTrim(s)
		return string.match(s, "^%s*(.-)%s*$")
	end

	local function findTrueSource(nLine)
		local sModule
		local nStart = 0

		for sKey, tModuleInfo in pairs(__files__) do
			if (tModuleInfo.line <= nLine and tModuleInfo.line > nStart) then
				sModule = sKey
				nStart = tModuleInfo.line
			end
		end

		return sModule or "(unknown)", nLine - nStart
	end

	local bStatus, aModule = xpcall(fImpl, function(sError)
		local sStack = debug.traceback()

		-- TODO: Optimize performance
		local tStack = strSplit(sStack, "\\n")
		local sResultError = "Uncaught error: " .. tostring(sError) .. "\\n in module " .. sName .. ":\\n"
		local sCurrentFile

		for i = 1, #tStack do
			local sLine = strTrim(tStack[i])
			local sFile, sLineNumber = table.unpack(strSplit(sLine, ":"))

			if (sCurrentFile == nil and type(sLineNumber) == "number") then
				sCurrentFile = sFile
			end

			if (sFile == sCurrentFile) then
				local sTrueFile, nTrueLine = findTrueSource(sLineNumber)

				sLine = "\\(" .. sTrueFile .. ":" .. tostring(nTrueLine) .. ") " .. sLine
			end

			if (i < 10) then
				sResultError = sResultError .. "\\n" .. sLine
			end
		end

		return sResultError
	end)

	if (bStatus) then
		__files__[sName] = {nLine, aModule}
	else
		error(aModule)
	end
end

${body}

__require__('${entryModuleName}')
`;

const defineTemplate = (line: number, name: string, content: string) => `
__define__(${line}, '${name}', function ()
${content}
end)
`;

class BundleStream {
	private _line: number = 0;
	private _chunks: string[] = [];

	getLine(): number {
		return this._line;
	}

	write(body: string) {
		this._chunks.push(body);
		this._line += (body.match(/\n/g) || []).length;
	}

	writeHeader() {
		const [body] = bundleTemplate("%__body__%", "").split("%__body__%")
		this.write(body);
	}

	writeFooter(entryModuleName: string) {
		const [_, body] = bundleTemplate("%__body__%", entryModuleName).split("%__body__%")
		this.write(body);
	}

	writeModule(name: string, content: string) {
		// TODO: Fix magic number
		this.write(defineTemplate(this.getLine() + 3, name, content));
	}

	toString(): string {
		return this._chunks.join("");
	}
}

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

	file.source = project.macrosCompiler.compile(file.source);

	expandRequires(file, project);

	project.bundleStream.writeModule(file.moduleName, file.source);
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

export interface BundleProjectOptions {
	projectFile?: string;
	args?: {
		entry: string;
		output?: string;
		noEmit?: boolean;
	}
}

export function bundleProject(options: BundleProjectOptions) {
	const {projectFile} = options;
	const {entry: entryArg, output: outputArg, noEmit} = options.args ?? {};

	// Creating project
	const project: Project = {
		config: {
			entry: "",
			output: "",
		},
		rootDir: process.cwd(),
		files: {},
		bundleStream: new BundleStream(),
		macrosCompiler: new MacrosCompiler(),
	}

	// Loading the config from the file
	if (typeof projectFile === "string") {
		const projectFileAbs = resolvePath(projectFile);
		const projectRoot = path.dirname(projectFileAbs);

		project.config = JSON.parse(fs.readFileSync(projectFileAbs, "utf-8"));
		project.config.entry = resolvePath(project.config.entry, projectRoot);
		project.config.output = resolvePath(project.config.output, projectRoot);
	} else {
		assertIsString(entryArg);
		project.config.entry = resolvePath(entryArg);

		if (!noEmit) {
			assertIsString(outputArg);

			project.config.output = resolvePath(outputArg);
		}
	}

	project.rootDir = path.dirname(project.config.entry);

	// Header stub file
	const headerFile: File = {
		source: '',
		path: path.resolve(project.rootDir, './__header__'),
		moduleName: '',
	}

	// Writing bundle header
	project.bundleStream.writeHeader();

	// Requiring entry file
	const entryFile = requireFile(project, headerFile, path.basename(project.config.entry));

	// Writing bundle footer
	project.bundleStream.writeFooter(entryFile.moduleName);

	// Validate that it's eiter noEmit or references but never both
	if (noEmit && project.config.references) {
		throw new Error("noEmit can apply only to projects without references")
	}

	const bundleSource = project.bundleStream.toString();

	// Writing bundle to file
	if (!noEmit) {
		fs.writeFileSync(project.config.output, bundleSource, 'utf-8');

		// Bundle size info
		console.log(
			`[${path.basename(project.config.output)}] Out bundle: `,
			formatFileSize(fs.statSync(project.config.output).size),
		);
	}

	// Bundling child projects
	if (project.config.references) {
		for (let reference of Object.values(project.config.references)) {
			reference = resolvePath(reference, project.rootDir);

			bundleProject({projectFile: reference});
		}
	}

	return bundleSource;
}
