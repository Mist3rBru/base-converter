/** @type {import('jest').Config} */
export default {
  bail: true,
  roots: ['<rootDir>/__tests__'],
  clearMocks: true,
  maxWorkers: 1,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: [['text'], 'html'],
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
      statements: -10,
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^#tests/(.*).js$': '<rootDir>/__tests__/$1',
    '^#(.*).js$': '<rootDir>/src/$1',
  },
  testRegex: ['__tests__/.+(spec|test).ts'],
}
