export const preset = "ts-jest";
export const testEnvironment = "jsdom";
export const clearMocks = true;
export const collectCoverage = true;
export const coverageDirectory = "coverage";
export const transform = {
  "^.+\\.(ts|tsx)$": "babel-jest",
  "^.+\\.css$": "<rootDir>/node_modules/jest-css-modules-transform",
};
export const transformIgnorePatterns = ["node_modules/(?!(axios)/)"];
