import {Browser, chromium, Page} from "playwright";
import * as path from 'path';
import * as fs from 'fs';
import {createServer} from "http-server";
import * as http from "http";
import {resolvePath} from "../common/resolvePath";
import {EventEmitter} from "events";
import {packImage, unpackImage} from "./image";

declare const __LS_ITEMS__: [string, string][];

interface Context {
	options: RunOptions;
	browserPromise?: Promise<Browser>;
	imageFileAbs?: string;
	image?: string;
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
	getRawImage(): string;
}

async function initializePage(context: Context): Promise<ComputerCraftInstance> {
	const imageSrc = typeof context.imageFileAbs === "string"
		? fs.readFileSync(context.imageFileAbs, "utf-8")
		: context.image;

	const image = JSON.parse(imageSrc);

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
		os.startTimer(1)
		os.pullEvent()
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
	let outFs;

	(instance as any).page = page;

	// Method to get output contents of the file system
	instance.getRawImage = () => {
		return outFs;
	}

	// Method to stop this instance
	instance.stop = async () => {
		// Grab the contents of fiel system
		outFs = await page.evaluate(function() {
			const entries: [string, string][] = [];

			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);

				entries.push([key, localStorage.getItem(key)]);
			}

			return JSON.stringify(entries);
		});

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
		fs?: string;
		folder?: string;
		port: number;
		watch?: boolean;
	}
}

export function run(options: RunOptions): Promise<ComputerCraftInstance> {
	const {fs: imageFile, folder} = options.args;

	if (typeof imageFile === "string") {
		const imageFileAbs = resolvePath(imageFile);

		return main({
			imageFileAbs,
			options,
		});
	} else {
		const folderAbs = resolvePath(folder);

		const image = packImage({
			args: {
				folder: folderAbs,
				output: undefined,
				noEmit: true,
			}
		});

		return main({
			image,
			options,
		}).then(instance => {
			instance.on("end", () => {
				const imageRaw = instance.getRawImage();

				// Unpacking the image after the test is sun
				unpackImage({
					args: {
						image: imageRaw,
						output: folderAbs,
					}
				});
			});

			return instance;
		})
	}
}
