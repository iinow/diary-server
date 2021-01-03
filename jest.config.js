module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,ts,js,js}', '!src/**/*.d.ts'],
}
