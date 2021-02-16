const fs = require('fs');
const { parse } = require('@babel/parser');

const checkIfTesting = (testArgument) => {
  if (testArgument === '-T') {
    return true;
  }
  return false;
};

const astFromFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');

  return parse(code, {
    sourceType: 'module',
    plugins: ['@babel/preset-env'],
  });
};

const getFilePaths = (paths, baseArr = []) => {
  const getFileNamesFromBasePath = (basePath, arr) => {
    fs.readdirSync(basePath).forEach((file) => {
      const fileName = `${basePath}/${file}`;
      if (!file.includes('__test__') && !file.includes('index')) {
        arr.push(fileName);
      }
    });
  };

  paths.forEach((path) => getFileNamesFromBasePath(path, baseArr));
  return baseArr;
};

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

const insertItemsToTestFile = (filePath, functionNames, testCodeFunction) => {
  const correspondingTestFile = findTestFilePath(filePath);
  const ast = astFromFile(correspondingTestFile);
  const alreadyInsertedActions = ast.program.body
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
  const textArray = [`Failing tests added to "${correspondingTestFile}"`];
  functionNames.forEach((name) => {
    if (!alreadyInsertedActions.includes(name)) {
      try {
        filePathStream.write(testCodeFunction(name));
        textArray.push(`    - ${name}`);
      } catch (err) {
        console.log(err);
      }
    }
  });
  if (textArray.length > 1) {
    textArray.forEach((text) => console.log(text));
  }
  filePathStream.end();
};

const cycleThroughPathsAndAddTests = (
  paths,
  addNewTestsFunction,
  getCorrespondingTestFileFunction,
  defaultCodeForTestsFunction,
) => {
  paths.forEach((path) => {
    try {
      if (fs.existsSync(path)) {
        addNewTestsFunction(path);
      }
    } catch (err) {
      const {
        testName,
        capitalizedTestName,
        correspondingTestFile,
      } = getCorrespondingTestFileFunction(path);
      fs.writeFileSync(
        correspondingTestFile,
        defaultCodeForTestsFunction(testName, capitalizedTestName),
      );
      console.log(`Created new test file for: ${path}`);
      addNewTestsFunction(path);
    }
  });
};

module.exports = {
  checkIfTesting,
  astFromFile,
  getFilePaths,
  findTestFilePath,
  insertItemsToTestFile,
  cycleThroughPathsAndAddTests,
};
