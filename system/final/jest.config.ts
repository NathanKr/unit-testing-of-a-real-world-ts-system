import type { Config } from "jest";

const config: Config = {
  transform: { "^.+\\.tsx?$": "ts-jest" },
  moduleNameMapper: { "\\.(css|less|sass|scss)$": "identity-obj-proxy" },
};

export default config;
