import {MacrosParser, parseArgs} from "./MacrosParser";

interface Macros {
	args: string[];
	value: string;
}

interface Block {
	start: number;
	end: number;
}

interface If {
	condition: boolean;
}

export class MacrosCompiler extends MacrosParser {
	private _defined: Record<string, Macros> = {};
	private _output: (Block | string)[];
	private _lastPushed: number = 0;
	private _ifStack: If[] = [];

	compile(src: string): string {
		this._output = [];
		this._lastPushed = 0;
		this._ifStack = [];

		this.consumeString(src);

		let result = this._output
			.map(b => typeof b === "string" ? b : src.substring(b.start, b.end))
			.join('');

		for (const name of Object.keys(this._defined)) {
			result = result.replace(
				new RegExp(`(?<execName>${name})\\s*(?<execArgs>\\(.+?\\))?`, "gm"),
				(value, name, argsRaw) => {
					const args = parseArgs(argsRaw);

					return this._executeMacros(name, args);
				}
			)
		}

		return result;
	}

	protected ondefine(start: number, end: number, name: string, args: string[], value: string) {
		if (this._canPush()) {
			this._defined[name] = {args, value};

			this._output.push({start: this._lastPushed, end: start});
		}

		this._lastPushed = end;
	}

	protected onifdef(start: number, end: number, name: string, invert: boolean = false) {
		if (this._canPush()) {
			const condition = this._defined.hasOwnProperty(name);

			this._ifStack.push({
				condition: invert ? !condition : condition,
			});

			this._output.push({start: this._lastPushed, end: start});
		}

		this._lastPushed = end;
	}

	protected onifndef(start: number, end: number, name: string) {
		this.onifdef(start, end, name, true);
	}

	protected onendif(start: number, end: number) {
		if (this._canPush()) {
			this._output.push({start: this._lastPushed, end: start});
			this._ifStack.pop();
		}

		this._lastPushed = end;
	}

	protected onundef(start: number, end: number, name: string) {
		if (this._canPush()) {
			delete this._defined[name];
			this._output.push({start: this._lastPushed, end: start});
		}

		this._lastPushed = end;
	}

	protected onend(start: number, end: number) {
		if (this._canPush()) {
			this._output.push({start: this._lastPushed, end: start});
		}

		this._lastPushed = end
	}

	private _canPush() {
		return !this._ifStack.length || this._ifStack[this._ifStack.length - 1].condition;
	}

	private _executeMacros(name: string, args: string[]): string {
		if (!this._defined.hasOwnProperty(name)) {
			return "";
		}

		const macros = this._defined[name];

		let replacement = macros.value;

		for (let i = 0; i < macros.args.length; i++) {
			const argName = macros.args[i];
			const argValue = args[i];

			replacement = replacement.replace(new RegExp(argName, "g"), argValue);
		}

		return replacement.trim();
	}

}
