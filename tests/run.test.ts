import {clearDist} from "./utils";
import {packImage, ComputerCraftInstance, run} from "../src/api";
import {toMatchImageSnapshot} from "jest-image-snapshot"
import * as fs from 'fs-extra';

expect.extend({ toMatchImageSnapshot });

describe("run", () => {
	let instance: ComputerCraftInstance;

	beforeEach(() => {
		clearDist("./tests/assets/dist/")
	});

	afterEach(async () => {
		await instance?.stop();
	});

	test("run an image", async () => {
		packImage({
			args: {
				folder: "./tests/assets/image2/",
				output: "./tests/assets/dist/image2.json"
			}
		});

		instance = await run({
			args: {
				fs: "./tests/assets/dist/image2.json",
				port: 8080,
			}
		});

		await instance.waitForStatus("ended");

		expect(await instance.page.screenshot()).toMatchImageSnapshot();
	});

	test("run in folder", async () => {
		fs.copySync("./tests/assets/image3/", "./tests/assets/dist/image3/");

		instance = await run({
			args: {
				folder: "./tests/assets/dist/image3/",
				port: 8080,
			}
		});

		await instance.waitForStatus("ended");
		await instance.stop();

		instance = undefined;

		expect(
			fs.readFileSync("./tests/assets/dist/image3/out.txt", "utf-8")
		).toMatchSnapshot();
	});

});
