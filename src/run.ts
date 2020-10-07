import {Browser, chromium, Page} from "playwright";
import * as path from 'path';
import * as fs from 'fs';
import {argv} from 'yargs';
import {createServer} from "http-server";
import * as http from "http";
import {assertIsString} from "./common/assertIsString";
import {assertIsNumber} from "./common/assertIsNumber";
import {resolvePath} from "./common/resolvePath";

declare const __LS_ITEMS__: [string, string][];

const {fs: imageFile, watch, port} = argv;

assertIsString(imageFile);
assertIsNumber(port);

const imageFileAbs = resolvePath(imageFile);

let browserPromise: Promise<Browser>;

function runChromium(): Promise<Browser> {
	if (!browserPromise) {
		browserPromise = chromium.launch({
			headless: false,
		});
	}

	return browserPromise;
}

async function initializePage(): Promise<Page> {
	const image = JSON.parse(fs.readFileSync(imageFileAbs, "utf-8"));

	const browser = await runChromium();

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

async function startServer(): Promise<http.Server> {
	const root = path.resolve(__dirname, "../vendor/copy-cat");

	const server = createServer({
		root,
	});

	server.listen(port);

	console.log(`Copy-cat root is ${root}`);
	console.log(`Listening on http://localhost:${port}`);

	return server;
}

async function main() {
	let [page] = await Promise.all([
		initializePage(),
		startServer(),
	]);

	await page.goto(`http://localhost:${port}`);

	if (watch) {
		fs.watchFile(imageFileAbs, async () => {
			await page.close();
			page = await initializePage();

			await page.goto(`http://localhost:${port}`);
		});
	}
}

main().catch(console.error);
