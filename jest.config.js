/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/example'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts*'],
  coverageThreshold: {
    global: {
      lines: 95,
      statements: 95,
      branches: 95,
      functions: 95
    }
  }
};
