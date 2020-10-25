import {packImage} from "../src/api";
import * as fs from "fs";
import { advanceTo, clear } from 'jest-date-mock';
import {clearDist} from "./utils";

describe("image", () => {

	beforeAll(() => {
		advanceTo(new Date(2020, 1, 1, 0, 0, 0));
	});

	beforeEach(() => {
		clearDist("./tests/assets/dist/")
	});

	afterAll(() => {
		clear();
	});

	test("image1 pack", () => {
		packImage({
			args: {
				folder: "./tests/assets/image1/",
				output: "./tests/assets/dist/image1.json"
			}
		});

		expect(
			JSON.parse(fs.readFileSync("./tests/assets/dist/image1.json", "utf-8"))
		).toMatchSnapshot();
	});

	test("image1 pack over existing file", () => {
		fs.writeFileSync("./tests/assets/dist/image1-exists.json", "I exist!");

		packImage({
			args: {
				folder: "./tests/assets/image1/",
				output: "./tests/assets/dist/image1-exists.json"
			}
		});

		expect(
			JSON.parse(fs.readFileSync("./tests/assets/dist/image1-exists.json", "utf-8"))
		).toMatchSnapshot();
	});

});
