const path = require('path');
const genDiff = require('../src/app');

const { stylishOutput, jsonOutput } = require('../__fixtures__/outputs');

const path1Json = path.resolve('__fixtures__', 'file1.json');
const path2Json = path.resolve('__fixtures__', 'file2.json');
const path1Yml = path.resolve('__fixtures__', 'file1.yml');
const path2Yml = path.resolve('__fixtures__', 'file2.yml');
const path1Yaml = path.resolve('__fixtures__', 'file1.yaml');
const path2Yaml = path.resolve('__fixtures__', 'file2.yaml');

describe('Diff stylish tests', () => {
  test('#1 diff two json files', () => {
    const stringifyDiff = genDiff(path1Json, path2Json);
    expect(stringifyDiff).toEqual(stylishOutput);
  });

  test('#2 diff two yaml files', () => {
    const stringifyDiff = genDiff(path1Yml, path2Yml);
    expect(stringifyDiff).toEqual(stylishOutput);
  });

  test('#3 diff yaml and yml files', () => {
    const stringifyDiff = genDiff(path1Yaml, path2Yml);
    expect(stringifyDiff).toEqual(stylishOutput);
  });

  test('#4 diff json and yml', () => {
    const stringifyDiff = genDiff(path1Json, path2Yml);
    expect(stringifyDiff).toEqual(stylishOutput);
  });

  test('#5 diff json and yaml', () => {
    const stringifyDiff = genDiff(path1Json, path2Yaml);
    expect(stringifyDiff).toEqual(stylishOutput);
  });
});

describe('Diff json tests', () => {
  test('#1 diff two json files', () => {
    const stringifyDiff = genDiff(path1Json, path2Json, 'json');
    expect(stringifyDiff).toEqual(jsonOutput);
  });

  test('#2 diff two yaml files', () => {
    const stringifyDiff = genDiff(path1Yml, path2Yml, 'json');
    expect(stringifyDiff).toEqual(jsonOutput);
  });

  test('#3 diff yaml and yml files', () => {
    const stringifyDiff = genDiff(path1Yaml, path2Yml, 'json');
    expect(stringifyDiff).toEqual(jsonOutput);
  });

  test('#4 diff json and yml', () => {
    const stringifyDiff = genDiff(path1Json, path2Yml, 'json');
    expect(stringifyDiff).toEqual(jsonOutput);
  });

  test('#5 diff json and yaml', () => {
    const stringifyDiff = genDiff(path1Json, path2Yaml, 'json');
    expect(stringifyDiff).toEqual(jsonOutput);
  });
});
