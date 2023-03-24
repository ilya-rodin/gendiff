const _ = require('lodash');
const fs = require('node:fs');
const path = require('path');

const getDataPath = (fileName1, fileName2) => {
  const absolutePath1 = path.resolve(process.cwd(), fileName1);
  const absolutePath2 = path.resolve(process.cwd(), fileName2);

  return [absolutePath1, absolutePath2];
}

const getParsedData = (fileName1, fileName2) => {
  const [path1, path2] = getDataPath(fileName1, fileName2);
  const data1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));

  return [data1, data2];
}

const genDiff = (filepath1, filepath2) => {
  const [data1, data2] = getParsedData(filepath1, filepath2);
  const keys1 = _.sortBy(_.keys(data1));
  const keys2 = _.sortBy(_.keys(data2));
  const keys = _.union(keys1, keys2);
  const spaces = '  ';

  /* eslint-disable no-param-reassign */
  let result = keys.reduce((acc, key) => {
    acc += spaces;

    if (_.includes(keys1, key) && _.includes(keys2, key)
        && data1[key] !== data2[key]) {
      acc += `- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
      return acc;
    }

    if (!_.includes(keys2, key)) {
      acc += `- ${key}: ${data1[key]}\n`;
      return acc;
    }

    if (_.includes(keys2, key) && !_.includes(keys1, key)) {
      acc += `+ ${key}: ${data2[key]}\n`;
      return acc;
    }

    acc += `${spaces}${key}: ${data1[key]}\n`;
    return acc;
  }, '');
  result = `{\n${result}}`;
  return result;
  /* eslint-enable no-param-reassign */
}

module.exports = genDiff;
