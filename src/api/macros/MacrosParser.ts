
function isObject(a: unknown): a is Record<string, any> {
	return a && typeof a === "object";
}

function isString(a: unknown): a is string {
	return typeof a === "string";
}

interface MacrosMatch {
	op: string;
	name?: string;
	args?: string;
	value?: string;
}

function isMacrosMatch(a: unknown): a is MacrosMatch {
	return isObject(a) && isString(a["op"]);
}

type Match = MacrosMatch

function isMatch(a: unknown): a is Match {
	return isMacrosMatch(a);
}

export function parseArgs(argsSrg: string | unknown): string[] {
	let args: string[] = [];

	if (isString(argsSrg)) {
		args = argsSrg
			.substring(1,argsSrg.length - 1)
			.split(',')
			.map(s => s.trim())
	}

	return args;
}

// const R_TOKENS = /#(?<op>define|undef|ifdef|ifndef|endif)\s*(?<name>[\w]+)?\s*(?<args>\(.*\))?(?<value>.*)/gm;
const R_TOKENS = /#(?<op>define|undef|ifdef|ifndef|endif)[\t ]*(?<name>[\w]+)?[\t ]*(?<args>\(.*\))?[\t ]*(?<value>.*)?/gm;

export abstract class MacrosParser {
	protected abstract ondefine(start: number, end: number, name: string, args: string[], value: string);
	protected abstract onundef(start: number, end: number, name: string);
	protected abstract onifdef(start: number, end: number, name: string);
	protected abstract onifndef(start: number, end: number, name: string);
	protected abstract onendif(start: number, end: number);
	protected abstract onend(start: number, end: number);

	consumeString(value: string) {
		while (true) {
			const matches = R_TOKENS.exec(value);

			const macros = matches?.groups;

			if (!isMatch(macros)) {
				break;
			}

			const start = matches.index;
			const end = matches.index + matches[0].length;

			switch (true) {
				case isMacrosMatch(macros):

					switch (macros.op) {
						case "define":
							const args = parseArgs(macros.args);

							isString(macros.name) && this.ondefine(start, end, macros.name, args, macros.value ?? '');
							break;

						case "undef":
						case "ifdef":
						case "ifndef":
							isString(macros.name) && this[`on${macros.op}`](start, end, macros.name);
							break;

						case "endif":
							this.onendif(start, end);
							break;
					}

					break;
			}
		}

		this.onend(value.length, value.length);
	}
}
