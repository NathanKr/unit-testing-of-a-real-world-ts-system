import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.tsx?$": "ts-jest" },
  moduleNameMapper: { "\\.(css|less|sass|scss)$": "identity-obj-proxy" },
  setupFilesAfterEnv: ["<rootDir>/test-jest/setup-jest.ts"],
  testMatch: ["<rootDir>/test-jest/**/*.test.{ts,tsx}"],
};

export default config;
