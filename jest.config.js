// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'components/player/**/*.{ts,tsx}',
    'components/podcast/**/*.{ts,tsx}',
    'components/navigation/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!components/ui/**',
  ],
};

module.exports = createJestConfig(config);
