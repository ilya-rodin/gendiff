import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import getParsedData from './parsers.js';
import generateDiff from './generator.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(cwd(), filepath);
const getFormat = (filepath) => extname(filepath).substring(1);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

const getDataFromPath = (filepath) => {
  const dataFormat = getFormat(filepath);
  const data = readFile(getAbsolutePath(filepath));

  return [data, dataFormat];
};

export default (filepath1, filepath2, formatType = 'stylish') => {
  const [data1, format1] = getDataFromPath(filepath1);
  const [data2, format2] = getDataFromPath(filepath2);

  const diff = generateDiff(
    getParsedData(data1, format1),
    getParsedData(data2, format2),
  );

  return format(diff, formatType);
};
