import { resolve, extname } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import getParsedData from './parsers.js';
import generateDiff from './generator.js';
import formatDiff from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(cwd(), filepath);
const getExtention = (filepath) => extname(filepath).substring(1);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

const getData = (filepath) => {
  const extention = getExtention(filepath);
  const content = readFile(getAbsolutePath(filepath));

  return getParsedData(content, extention);
};

export default (filepath1, filepath2, formatType = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const diff = generateDiff(data1, data2);
  return formatDiff(diff, formatType);
};
