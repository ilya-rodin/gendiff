const path = require('node:path');
const genDiff = require('../src/app');

const path1 = path.resolve('__tests__/file1.json');
const path2 = path.resolve('__tests__/file2.json');

const testDiffs = `\t- follow: false
\t  host: hexlet.io
\t- proxy: 123.234.53.22
\t- timeout: 50
\t+ timeout: 20
\t+ verbose: true
`;

describe('test case 1', () => {
  test('test base diff', () => {
    const diffs = genDiff(path1, path2);
    expect(diffs).toEqual(testDiffs);
  });
});
