const path = require('path');
const genDiff = require('../src/app');
const stringify = require('../src/formatters/stylish');

const stylishOutput = require('../__fixtures__/outputs');

const path1Json = path.resolve('__fixtures__', 'file1.json');
const path1Yaml = path.resolve('__fixtures__', 'file1.yml');
const path2Json = path.resolve('__fixtures__', 'file2.json');
const path2Yaml = path.resolve('__fixtures__', 'file2.yml');

describe('test diff', () => {
  test('diff two json files', () => {
    const diffs = stringify(genDiff(path1Json, path2Json));
    expect(diffs).toEqual(stylishOutput);
  });

  test('diff two yaml files', () => {
    const diffs = stringify(genDiff(path1Yaml, path2Yaml));
    expect(diffs).toEqual(stylishOutput);
  });
});
