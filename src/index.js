import { resolve, extname } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import getParsedData from './parsers.js';
import generateDiff from './generator.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(cwd(), filepath);
const getFormat = (filepath) => extname(filepath).substring(1);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

const getData = (filepath, formatType) => {
  const file = readFile(getAbsolutePath(filepath));
  return getParsedData(file, formatType);
};

export default (filepath1, filepath2, formatType = 'stylish') => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);
  const data1 = getData(filepath1, format1);
  const data2 = getData(filepath2, format2);

  const diff = generateDiff(data1, data2);
  return format(diff, formatType);
};
