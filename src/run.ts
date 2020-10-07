import {Browser, chromium, Page} from "playwright";
import * as path from 'path';
import * as fs from 'fs';
import {argv} from 'yargs';
import {createServer} from "http-server";
import * as http from "http";
import {assertIsString} from "./common/assertIsString";

declare const __LS_ITEMS__: [string, string][];

const PORT = 8080;

const {fs: imageFile, watch} = argv;

assertIsString(imageFile);

const imageFileAbs = path.isAbsolute(imageFile)
	? imageFile
	: path.resolve(process.cwd(), imageFile);

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
	const server = createServer({
		root: "./bin/copy-cat",
	});

	server.listen(PORT);

	return server;
}

async function main() {
	let [page] = await Promise.all([
		initializePage(),
		startServer(),
	]);

	await page.goto(`http://localhost:${PORT}`);

	if (watch) {
		fs.watchFile(imageFileAbs, async () => {
			await page.close();
			page = await initializePage();

			await page.goto(`http://localhost:${PORT}`);
		});
	}
}

main().catch(console.error);
