module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      }
    ]
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/projects/*/src/**/*.spec.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    'projects/*/src/**/*.ts',
    '!src/**/*.spec.ts',
    '!projects/*/src/**/*.spec.ts',
    '!src/main.ts',
    '!projects/*/src/main.ts',
  ],
};
