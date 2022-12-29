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
      lines: 50
    }
  }
};
