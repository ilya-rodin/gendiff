import path from 'path';
import genDiff from '../src/app';

import { stylishOutput, jsonOutput, plainOutput } from '../__fixtures__/outputs';

const path1Json = path.resolve('__fixtures__', 'file1.json');
const path2Json = path.resolve('__fixtures__', 'file2.json');
const path1Yml = path.resolve('__fixtures__', 'file1.yml');
const path2Yml = path.resolve('__fixtures__', 'file2.yml');
const path1Yaml = path.resolve('__fixtures__', 'file1.yaml');
const path2Yaml = path.resolve('__fixtures__', 'file2.yaml');

describe('Diff stylish tests', () => {
  test('#1 diff stylish two json files', () => {
    const diff = genDiff(path1Json, path2Json);
    expect(diff).toEqual(stylishOutput);
  });

  test('#2 diff stylish two yaml files', () => {
    const diff = genDiff(path1Yml, path2Yml);
    expect(diff).toEqual(stylishOutput);
  });

  test('#3 diff stylish yaml and yml files', () => {
    const diff = genDiff(path1Yaml, path2Yml);
    expect(diff).toEqual(stylishOutput);
  });

  test('#4 diff stylish json and yaml', () => {
    const diff = genDiff(path1Json, path2Yaml);
    expect(diff).toEqual(stylishOutput);
  });

  test('#5 diff plain two json files', () => {
    const diff = genDiff(path1Json, path2Json, 'plain');
    expect(diff).toEqual(plainOutput);
  });

  test('#6 diff plain two yaml files', () => {
    const diff = genDiff(path1Yml, path2Yml, 'plain');
    expect(diff).toEqual(plainOutput);
  });

  test('#7 diff plain yaml and yml files', () => {
    const diff = genDiff(path1Yaml, path2Yml, 'plain');
    expect(diff).toEqual(plainOutput);
  });

  test('#8 diff plain json and yml', () => {
    const diff = genDiff(path1Json, path2Yaml, 'plain');
    expect(diff).toEqual(plainOutput);
  });

  test('#9 diff json two json files', () => {
    const diff = genDiff(path1Json, path2Json, 'json');
    expect(diff).toEqual(jsonOutput);
  });

  test('#10 diff json two yaml files', () => {
    const diff = genDiff(path1Yml, path2Yml, 'json');
    expect(diff).toEqual(jsonOutput);
  });

  test('#11 diff json yaml and yml files', () => {
    const diff = genDiff(path1Yaml, path2Yml, 'json');
    expect(diff).toEqual(jsonOutput);
  });

  test('#12 diff json json and yml', () => {
    const diff = genDiff(path1Json, path2Yaml, 'json');
    expect(diff).toEqual(jsonOutput);
  });
});
