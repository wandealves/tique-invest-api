module.exports = {
  roots: ["<rootDir>/tests"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/tests/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist"]
};
