export {BundleProjectOptions, bundleProject} from "./project";
export {PackImageOptions, packImage} from "./image";
export {RunOptions, ComputerCraftInstance, run} from "./runner";

export interface UnpackImageOptions {
	args?: {
		image: string;
		output: string;
	}
}

export function unpackImage(options: UnpackImageOptions) {
}

export interface TestOptions {
	args?: {
		project: string;
		testsGrep?: string;
		suitsGrep?: string;
	}
}

export function test(options: TestOptions) {
}
