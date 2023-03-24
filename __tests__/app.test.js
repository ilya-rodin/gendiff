const path = require('node:path');
const genDiff = require('../src/app');

const path1Json = path.resolve('__fixtures__', 'file1.json');
const path2Json = path.resolve('__fixtures__', 'file2.json');

const path1Yaml = path.resolve('__fixtures__', 'file1.yml');
const path2Yaml = path.resolve('__fixtures__', 'file2.yml');

const testDiffs = `{\n  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('test case 1', () => {
  test('diff two flat json files', () => {
    const diffs = genDiff(path1Json, path2Json);
    expect(diffs).toEqual(testDiffs);
  });

  test('diff two flat yaml files', () => {
    const diffs = genDiff(path1Yaml, path2Yaml);
    expect(diffs).toEqual(testDiffs);
  });
});
