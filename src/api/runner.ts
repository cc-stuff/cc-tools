import {Browser, chromium, Page} from "playwright";
import * as path from 'path';
import * as fs from 'fs';
import {createServer} from "http-server";
import * as http from "http";
import {assertIsString} from "../common/assertIsString";
import {assertIsNumber} from "../common/assertIsNumber";
import {resolvePath} from "../common/resolvePath";
import {EventEmitter} from "events";

declare const __LS_ITEMS__: [string, string][];

interface Context {
	options: RunOptions;
	browserPromise?: Promise<Browser>;
	imageFileAbs: string;
	server?: http.Server;
}

function runChromium(context: Context): Promise<Browser> {
	if (!context.browserPromise) {
		context.browserPromise = chromium.launch({
			headless: false,
		});
	}

	return context.browserPromise;
}

export interface ComputerCraftInstance extends EventEmitter {
	readonly page: Page;

	stop(): Promise<void>;
	waitForStatus(status: "started" | "ended"): Promise<void>;
}

async function initializePage(context: Context): Promise<ComputerCraftInstance> {
	const image = JSON.parse(fs.readFileSync(context.imageFileAbs, "utf-8"));

	const browser = await runChromium(context);

	const page = await browser.newPage();

	const initScript = "(" + function () {
		function patchStartupFile(originalFile?: string): string {
			return btoa(`
cctools = {}

cctools.start = function()
	local writeCommand = function(sCommand)
		local file = fs.open(".ccstatus", "w")
		file.write(sCommand)
		file.close()
	end

	cctools.finish = function()
		writeCommand("ended")
	end

	writeCommand("started")
end

cctools.start()

${originalFile === undefined ? "" : atob(originalFile)}
`);
		}

		const items = __LS_ITEMS__;
		const startupKey = "computer[0].files[startup.lua].b64";
		const statusKey = "computer[0].files[.ccstatus].b64";

		localStorage.clear();

		for (const [key, value] of items) {
			let parsedValue = key.endsWith(".b64")
				? JSON.parse(value)
				: value;

			// Patching startup file
			if (key === startupKey) {
				parsedValue = patchStartupFile(parsedValue);
			}

			localStorage.setItem(key, parsedValue);
		}

		// Hook to clear status
		(window as any).__clearStatus__ = () => {
			const statusElement = document.getElementById("ccstatus");

			if (statusElement) {
				statusElement.parentNode.removeChild(statusElement);
			}
		}

		const originalSetItem = localStorage.setItem;

		// Patching localStorage.set to monitor ComputerCraft FS changes
		localStorage.setItem = function (key: string, value: any) {
			// Displaying status in DOM so that Node process can pick it up
			if (key === statusKey) {
				(window as any).__clearStatus__();

				const statusElement = document.createElement("DIV");
				statusElement.id = "ccstatus";
				statusElement.style.display = "none";
				statusElement.innerText = atob(String(value));

				document.body.appendChild(statusElement);

				console.log("status changed", statusElement.innerText);
			}

			originalSetItem.apply(localStorage, arguments);
		}
	}.toString().replace("__LS_ITEMS__", JSON.stringify(image)) + ")()";

	await page.addInitScript(initScript);

	const instance: ComputerCraftInstance = new EventEmitter() as ComputerCraftInstance;
	const server = await startServer(context);
	let running = true;

	(instance as any).page = page;

	// Method to stop this instance
	instance.stop = async () => {
		running = false;
		instance.emit("end");

		await Promise.all([
			// Closing the page
			page.close(),
			// Closing the server
			new Promise(resolve => server.close(resolve)),
		]);

		// Closing the browser
		await browser.close();
	}

	// Method to wait for status to come
	instance.waitForStatus = (status: string) => {
		return new Promise(resolve => {
			const listener = (newStatus: string) => {
				if (newStatus === status) {
					instance.off("status", listener);
					resolve();
				}
			}

			instance.on("status", listener);
		});
	}

	(async () => {
		while (running) {
			try {
				const ccStatus = await page.waitForSelector("#ccstatus", {state: "attached"});
				const status = await ccStatus.innerText();

				await page.evaluate("__clearStatus__()")

				instance.emit("status", status);
			} catch (error) {
				console.error(error);
				return;
			}
		}
	})().then()

	return instance;
}

async function startServer(context: Context): Promise<http.Server> {
	if (context.server) {
		return context.server;
	}

	const root = path.resolve(__dirname, "../../vendor/copy-cat");

	const server = createServer({
		root,
	});

	context.server = server;

	server.listen(context.options.args.port);

	const serverImpl: http.Server = typeof (server as any).server?.close === "function"
		? (server as any).server
		: server;

	server.close = function() {
		console.log("Server stopped gracefully");
		return serverImpl.close.apply(serverImpl, arguments);
	}

	console.log(`Copy-cat root is ${root}`);
	console.log(`Listening on http://localhost:${context.options.args.port}`);

	return server;
}

async function main(context: Context): Promise<ComputerCraftInstance> {
	let instance = await initializePage(context);

	await instance.page.goto(`http://localhost:${context.options.args.port}`);

	if (context.options.args.watch) {
		fs.watchFile(context.imageFileAbs, async () => {
			await instance.page.close();
			instance = await initializePage(context);

			await instance.page.goto(`http://localhost:${context.options.args.port}`);
		});
	}

	return instance;
}

export interface RunOptions {
	args?: {
		fs: string;
		port: number;
		watch?: boolean;
	}
}

export function run(options: RunOptions): Promise<ComputerCraftInstance> {
	const {fs: imageFile, port} = options.args;

	assertIsString(imageFile);
	assertIsNumber(port);

	const imageFileAbs = resolvePath(imageFile);

	return main({
		imageFileAbs,
		options,
	});
}
