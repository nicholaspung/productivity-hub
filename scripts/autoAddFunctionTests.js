const fs = require('fs');
const { parse } = require('@babel/parser');

const filePaths = [
  './src/utils.js',
  './src/components/HabitTracker/utils.js',
  './src/components/HabitTracker/redux/selectors.js',
  './src/components/PostSaver/redux/selectors.js',
  './src/components/User/redux/selectors.js',
];

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

  const exportedBodyDeclarations = ast.program.body
    .filter((d) => d.type === 'ExportNamedDeclaration')
    .map((d) => d.declaration.declarations[0].id.name);
  return exportedBodyDeclarations;
};

const insertFunctionsToTestFile = (filePath, functionNames) => {
  const filePathArray = filePath.split('/');
  const relativePath = filePathArray
    .slice(0, filePathArray.length - 1)
    .join('/');
  let fileName = filePathArray[filePathArray.length - 1].split('.');
  fileName.splice(1, 0, 'spec');
  fileName = fileName.join('.');
  const testFolderName = '/__test__/';
  const correspondingTestFile = `${relativePath}${testFolderName}${fileName}`;

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
  console.log(functionNames);
  console.log(alreadyInsertedFunctionNames);
};

filePaths.forEach((path) => {
  const names = grabExportedFunctionNames(path);
  insertFunctionsToTestFile(path, names);
});
