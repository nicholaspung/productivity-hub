const {
  checkIfTesting,
  astFromFile,
  getFilePaths,
  findTestFilePath,
  insertItemsToTestFile,
  cycleThroughPathsAndAddTests,
} = require('./utils/testUtils.js');

/**
 * Declare the file directories for files with only functions. This script,
 * as explained by the title, auto creates function tests for newly created
 * files, and also for newly added functions within the directories stated
 * below.
 */
const testing = checkIfTesting(process.argv[2]);

let baseFileDirectoryPaths = [];
if (!testing) {
  baseFileDirectoryPaths = ['./src/utils', './src/redux/selectors'];
}

/**
 * This code below changes with specific use cases
 */
const filePaths = getFilePaths(baseFileDirectoryPaths);

// https://astexplorer.net/
const grabExportedFunctionNames = (filePath) => {
  const ast = astFromFile(filePath);
  return ast.program.body
    .filter((d) => d.type === 'ExportNamedDeclaration')
    .flatMap((e) => e.declaration.declarations)
    .filter((f) => f.init.type === 'ArrowFunctionExpression' && f.id.name)
    .flatMap((g) => g.id.name);
};

const createFailingTestCode = (functionName) => `it('#${functionName}', () => {
  expect(true).toEqual(false);
});`;

const addNewTests = (path) => {
  const names = grabExportedFunctionNames(path);
  insertItemsToTestFile(path, names, createFailingTestCode);
};

const getCorrespondingTestFile = (path) => {
  const splitPath = path.split('/');
  const testName = splitPath[splitPath.length - 1].split('.')[0];
  const capitalizedTestName =
    testName.charAt(0).toUpperCase() + testName.slice(1);
  const correspondingTestFile = findTestFilePath(path);
  return { testName, capitalizedTestName, correspondingTestFile };
};

const defaultCodeForTests = (testName, capitalizedTestName) =>
  `import * as utils from '../${testName}';\n\ndescribe('#${capitalizedTestName}', () => {})\n`;
/**
 * End code changes
 */

cycleThroughPathsAndAddTests(
  filePaths,
  addNewTests,
  getCorrespondingTestFile,
  defaultCodeForTests,
);

console.log('\nFinished checking tracked function files.');
