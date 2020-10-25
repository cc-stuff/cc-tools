import {Browser, chromium, Page} from "playwright";
import * as path from 'path';
import * as fs from 'fs';
import {createServer} from "http-server";
import * as http from "http";
import {assertIsString} from "../common/assertIsString";
import {assertIsNumber} from "../common/assertIsNumber";
import {resolvePath} from "../common/resolvePath";

declare const __LS_ITEMS__: [string, string][];

interface Context {
	options: RunOptions;
	browserPromise?: Promise<Browser>;
	imageFileAbs: string;
}

function runChromium(context: Context): Promise<Browser> {
	if (!context.browserPromise) {
		context.browserPromise = chromium.launch({
			headless: false,
		});
	}

	return context.browserPromise;
}

async function initializePage(context: Context): Promise<Page> {
	const image = JSON.parse(fs.readFileSync(context.imageFileAbs, "utf-8"));

	const browser = await runChromium(context);

	const page = await browser.newPage();

	const initScript = "(" + function () {
		const items = __LS_ITEMS__;

		localStorage.clear();

		for (const [key, value] of items) {
			if (key.endsWith(".b64")) {
				localStorage.setItem(key, JSON.parse(value));
			} else {
				localStorage.setItem(key, value);
			}
		}
	}.toString().replace("__LS_ITEMS__", JSON.stringify(image)) + ")()";

	await page.addInitScript(initScript);

	return page;
}

async function startServer(context: Context): Promise<http.Server> {
	const root = path.resolve(__dirname, "../vendor/copy-cat");

	const server = createServer({
		root,
	});

	server.listen(context.options.args.port);

	console.log(`Copy-cat root is ${root}`);
	console.log(`Listening on http://localhost:${context.options.args.port}`);

	return server;
}

async function main(context: Context) {
	let [page] = await Promise.all([
		initializePage(context),
		startServer(context),
	]);

	await page.goto(`http://localhost:${context.options.args.port}`);

	if (context.options.args.watch) {
		fs.watchFile(context.imageFileAbs, async () => {
			await page.close();
			page = await initializePage(context);

			await page.goto(`http://localhost:${context.options.args.port}`);
		});
	}
}

export interface RunOptions {
	args?: {
		fs: string;
		port: number;
		watch?: boolean;
	}
}

export function run(options: RunOptions): Promise<void> {
	const {fs: imageFile, port} = options.args;

	assertIsString(imageFile);
	assertIsNumber(port);

	const imageFileAbs = resolvePath(imageFile);

	return main({
		imageFileAbs,
		options,
	});
}
