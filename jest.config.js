module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots: ["src/**/*"],
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  // collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  // moduleFileExtensions: ["ts", "js", "json"],
  testRegex: '(test/.*|(\\.|/)(test|spec))\\.(ts)?$',
  // coverageDirectory: 'coverage',
}
