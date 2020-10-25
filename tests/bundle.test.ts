import * as fs from "fs";
import {bundleProject} from "../src/api";

describe("bundle", () => {

	test("project1 bundling", () => {
		bundleProject({
			projectFile: "./tests/assets/project1/project.json"
		});

		expect(fs.readFileSync("./tests/assets/project1/dist/project1.lua", "utf-8")).toMatchSnapshot();
	});

});
