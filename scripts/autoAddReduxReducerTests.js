const {
  checkIfTesting,
  astFromFile,
  getFilePaths,
  findTestFilePath,
  insertItemsToTestFile,
  cycleThroughPathsAndAddTests,
} = require('./utils/testUtils.js');

/**
 * This script, as explained by the title, auto creates redux reducer tests for newly created
 * files, and also for newly added reducer tests within the directories stated below.
 */
const testing = checkIfTesting(process.argv[2]);

let baseFileDirectoryPaths = [];
if (!testing) {
  baseFileDirectoryPaths = ['./src/redux/reducers'];
}

/**
 * This code below changes with specific use cases
 */
const reducerFilePaths = getFilePaths(baseFileDirectoryPaths);
const filePaths = getFilePaths(reducerFilePaths);

// https://astexplorer.net/
const grabImportedActions = (filePath) => {
  const ast = astFromFile(filePath);
  return ast.program.body
    .filter((d) => d.type === 'ImportDeclaration')
    .flatMap((e) => e.specifiers)
    .flatMap((e) => e.local.name);
};

const createFailingTestCode = (functionName) => `it('#${functionName}', () => {
  expect(
    reducer(initialState, { type: '${functionName}', payload: undefined }),
  ).toEqual({
    ...initialState, undefined
  });
});`;

const addNewTests = (path) => {
  const names = grabImportedActions(path);
  insertItemsToTestFile(path, names, createFailingTestCode);
};

const getCorrespondingTestFile = (path) => {
  const splitPath = path.split('/');
  const testName = splitPath[splitPath.length - 1].split('.')[0];
  const capitalizedTestName = `${
    testName.charAt(0).toUpperCase() + testName.slice(1)
  }Reducer`;
  const correspondingTestFile = findTestFilePath(path);
  return { testName, capitalizedTestName, correspondingTestFile };
};

const defaultCodeForTests = (testName, capitalizedTestName) =>
  `import reducer, { initialState } from '../${testName}';\n\ndescribe('#${capitalizedTestName}', () => {})\n`;
/**
 * End code changes
 */

cycleThroughPathsAndAddTests(
  filePaths,
  addNewTests,
  getCorrespondingTestFile,
  defaultCodeForTests,
);

console.log('\nFinished checking tracked redux reducer files.');
