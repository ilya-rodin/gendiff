const path = require('node:path');
const genDiff = require('../src/app');

const path1 = path.resolve('__fixtures__', 'file1.json');
const path2 = path.resolve('__fixtures__', 'file2.json');

const testDiffs = `{\n  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('test case 1', () => {
  test('test base diff', () => {
    const diffs = genDiff(path1, path2);
    expect(diffs).toEqual(testDiffs);
  });
});
