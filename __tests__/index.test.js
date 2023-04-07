import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylishOutput = readFixtureFile('stylishOutput.txt');
const plainOutput = readFixtureFile('plainOutput.txt');
const jsonOutput = readFixtureFile('jsonOutput.txt');

test.each(['.json', '.yml'])('File Extentions Test $# %o', (extention) => {
  const filepath1 = getFixturePath(`file1${extention}`);
  const filepath2 = getFixturePath(`file2${extention}`);
  expect(genDiff(filepath1, filepath2)).toBe(stylishOutput);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishOutput);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainOutput);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(jsonOutput);
  expect(genDiff(filepath1, filepath2, 'unknown')).toThrow();
});
