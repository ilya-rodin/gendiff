import path from 'path';
import fs from 'fs';
import getParsedData from './parsers';
import generateDiff from './generator';
import format from './formatters/index';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).substring(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export default (filepath1, filepath2, formatType = 'stylish') => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const data1 = readFile(absolutePath1);
  const data2 = readFile(absolutePath2);

  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const diff = generateDiff(getParsedData(data1, format1), getParsedData(data2, format2));

  return format(diff, formatType);
};
