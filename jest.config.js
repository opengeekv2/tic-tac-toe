/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  "projects": [
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
    },
    {
      displayName: 'test',
      preset: 'ts-jest',
      testEnvironment: 'node',
      globals: {
        'ts-jest': {
          isolatedModules: true
        } 
      },
    }
  ]
};

