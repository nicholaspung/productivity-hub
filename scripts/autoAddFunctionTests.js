const fs = require('fs');
const { parse } = require('@babel/parser');

const baseFileDirectoryPaths = ['./src/utils', './src/redux/selectors'];
const filePaths = [];

const getFileNamesFromBasePath = (basePath) => {
  fs.readdirSync(basePath).forEach((file) => {
    const fileName = `${basePath}/${file}`;
    if (!file.includes('__test__') && !file.includes('index')) {
      filePaths.push(fileName);
    }
  });
};

baseFileDirectoryPaths.forEach(getFileNamesFromBasePath);

// https://astexplorer.net/
const astFromFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');

  return parse(code, {
    sourceType: 'module',
    plugins: ['@babel/preset-env'],
  });
};

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

const findTestFilePath = (filePath) => {
  const filePathArray = filePath.split('/');
  const relativePath = filePathArray
    .slice(0, filePathArray.length - 1)
    .join('/');
  let fileName = filePathArray[filePathArray.length - 1].split('.');
  fileName.splice(1, 0, 'spec');
  fileName = fileName.join('.');
  const testFolderName = '/__test__/';
  return `${relativePath}${testFolderName}${fileName}`;
};

const insertFunctionsToTestFile = (filePath, functionNames) => {
  const correspondingTestFile = findTestFilePath(filePath);
  const ast = astFromFile(correspondingTestFile);
  const alreadyInsertedFunctionNames = ast.program.body
    .filter((d) => d.type === 'ExpressionStatement')
    .flatMap((d) => d.expression.arguments)
    .filter((d) => d.type === 'ArrowFunctionExpression')
    .flatMap((d) =>
      d.body.body
        .filter((e) => e.type === 'ExpressionStatement')
        .map(
          (f) =>
            f.expression.arguments
              .filter((g) => g.type === 'StringLiteral')[0]
              .value.split('#')[1],
        ),
    );

  const filePathStream = fs.createWriteStream(correspondingTestFile, {
    flags: 'a',
  });
  functionNames.forEach((name) => {
    if (!alreadyInsertedFunctionNames.includes(name)) {
      try {
        filePathStream.write(createFailingTestCode(name));
        console.log(
          `Failing test for "${name}" in "${filePath}" added to test file: "${correspondingTestFile}"`,
        );
      } catch (err) {
        console.log(err);
      }
    }
  });
  filePathStream.end();
};

filePaths.forEach((path) => {
  try {
    if (fs.existsSync(path)) {
      const names = grabExportedFunctionNames(path);
      insertFunctionsToTestFile(path, names);
    }
  } catch (err) {
    const splitPath = path.split('/');
    const testName = splitPath[splitPath.length - 1].split('.')[0];
    const capitalizedTestName =
      testName.charAt(0).toUpperCase() + testName.slice(1);
    const correspondingTestFile = findTestFilePath(path);
    fs.writeFileSync(
      correspondingTestFile,
      `describe('#${capitalizedTestName}', () => {})`,
    );
    const names = grabExportedFunctionNames(path);
    insertFunctionsToTestFile(path, names);
  }
});

console.log('Finished checking tracked files.');
