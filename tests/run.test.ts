import {clearDist} from "./utils";
import {packImage, ComputerCraftInstance, run} from "../src/api";
import {toMatchImageSnapshot} from "jest-image-snapshot"

expect.extend({ toMatchImageSnapshot });

describe("run", () => {
	let instance: ComputerCraftInstance;

	beforeEach(() => {
		clearDist("./tests/assets/dist/")
	});

	afterEach(async () => {
		await instance.stop();
		console.log("afterall")
	})

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

});
