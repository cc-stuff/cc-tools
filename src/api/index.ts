export {BundleProjectOptions, bundleProject} from "./project";
export {PackImageOptions, UnpackImageOptions, packImage, unpackImage} from "./image";
export {RunOptions, ComputerCraftInstance, run} from "./runner";

export interface TestOptions {
	args?: {
		project: string;
		testsGrep?: string;
		suitsGrep?: string;
	}
}

export function test(options: TestOptions) {
}
