const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const esModules = ["query-string"];

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  setupFiles: ["./jest.polyfills.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: esModules.length
    ? [`/node_modules/(?!${esModules.join("|")})`]
    : [],
  collectCoverage: true,
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

export {};
