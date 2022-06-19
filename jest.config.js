/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["node_modules", "<rootDir>/src"],
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: '<rootDir>/tsconfig.spec.json',
      useESM: true,
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};
