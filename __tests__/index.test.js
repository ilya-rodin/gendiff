import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* eslint-disable no-underscore-dangle */

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const path1Json = getFixturePath('file1.json');
const path2Json = getFixturePath('file2.json');
const path1Yml = getFixturePath('file1.yml');
const path2Yml = getFixturePath('file2.yml');
const path1Yaml = getFixturePath('file1.yaml');
const path2Yaml = getFixturePath('file2.yaml');

const stylishOutput = readFixtureFile('stylishOutput.txt');
const plainOutput = readFixtureFile('plainOutput.txt');
const jsonOutput = readFixtureFile('jsonOutput.txt');

describe('Diff stylish tests', () => {
  test.each([
    { diff: genDiff(path1Json, path2Json), expected: stylishOutput },
    { diff: genDiff(path1Yml, path2Yml), expected: stylishOutput },
    { diff: genDiff(path1Yaml, path2Yml), expected: stylishOutput },
    { diff: genDiff(path1Json, path2Yaml), expected: stylishOutput },
  ])('# $#', ({ diff, expected }) => {
    expect(diff).toEqual(expected);
  });
});

describe('Diff plain tests', () => {
  test.each([
    { diff: genDiff(path1Json, path2Json, 'plain'), expected: plainOutput },
    { diff: genDiff(path1Yml, path2Yml, 'plain'), expected: plainOutput },
    { diff: genDiff(path1Yaml, path2Yml, 'plain'), expected: plainOutput },
    { diff: genDiff(path1Json, path2Yaml, 'plain'), expected: plainOutput },
  ])('# $#', ({ diff, expected }) => {
    expect(diff).toEqual(expected);
  });
});

describe('Diff json tests', () => {
  test.each([
    { diff: genDiff(path1Json, path2Json, 'json'), expected: jsonOutput },
    { diff: genDiff(path1Yml, path2Yml, 'json'), expected: jsonOutput },
    { diff: genDiff(path1Yaml, path2Yml, 'json'), expected: jsonOutput },
    { diff: genDiff(path1Json, path2Yaml, 'json'), expected: jsonOutput },
  ])('# $#', ({ diff, expected }) => {
    expect(diff).toEqual(expected);
  });
});
