module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["<rootDir>/tests/**/*.test.ts?(x)"],
	setupFiles: ["jest-date-mock"]
};
