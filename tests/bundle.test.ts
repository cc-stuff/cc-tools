import * as fs from "fs";
import {bundleProject} from "../src/api";
import {clearDist} from "./utils";

describe("bundle", () => {

	beforeEach(() => {
		clearDist("./tests/assets/project1/dist")
		clearDist("./tests/assets/project2/dist")
	});

	test("project1 bundling", () => {
		bundleProject({
			projectFile: "./tests/assets/project1/project.json"
		});

		expect(
			fs.readFileSync("./tests/assets/project1/dist/project1.lua", "utf-8")
		).toMatchSnapshot();
	});

	test("project1 bundling with explicit args", () => {
		bundleProject({
			args: {
				entry: "./tests/assets/project1/index.lua",
				output: "./tests/assets/project1/dist/project1-explicit.lua",
			},
		});

		expect(
			fs.readFileSync("./tests/assets/project1/dist/project1-explicit.lua", "utf-8")
		).toMatchSnapshot();
	});

	test("project1 bundling with noEmit", () => {
		const bundleSource = bundleProject({
			args: {
				entry: "./tests/assets/project1/index.lua",
				noEmit: true,
			},
		});

		expect(bundleSource).toMatchSnapshot();
	});

	test("project2 bundling with references", () => {
		bundleProject({
			projectFile: "./tests/assets/project2/project.json"
		});

		expect(
			fs.readFileSync("./tests/assets/project2/dist/project2.lua", "utf-8")
		).toMatchSnapshot();

		expect(
			fs.readFileSync("./tests/assets/project2/dist/validator.lua", "utf-8")
		).toMatchSnapshot();
	});

});
