/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/fixtures/example'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts*'],
  cache: false,
  clearMocks: true,
  silent: false,
  testTimeout: 30000,
  coverageThreshold: {
    global: {
      lines: 95,
      branches: 95,
      statements: 95,
      functions: 95
    }
  }
};
