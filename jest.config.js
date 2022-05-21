module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/src/main/index.ts",
    "!<rootDir>/src/main/server.ts",
    "!<rootDir>/src/presentation/controllers/index.ts",
    "!<rootDir>/src/presentation/protocols/index.ts",
    "!<rootDir>/src/main/adapters/express-route-adapter.ts",
    "!<rootDir>/src/services/helpers/tests/test-helper.ts"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest"
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist"],
  modulePathIgnorePatterns: [
    "<rootDir>/src/main/adapters",
    "<rootDir>/src/main/docs",
    "<rootDir>/src/main/config",
    "<rootDir>/src/main/factories",
    "<rootDir>/src/main/routes",
    "<rootDir>/src/presentation/dtos",
    "<rootDir>/src/presentation/errors",
    "<rootDir>/src/presentation/helpers",
    "<rootDir>/src/services/usecases/protocols"
  ]
};
