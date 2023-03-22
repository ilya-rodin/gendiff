const _ = require('lodash');
const fs = require('node:fs');
const path = require('path');

function getDataFromPath(filepath1, filepath2) {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf-8'));

  return [data1, data2];
}

function findDiff(filepath1, filepath2) {
  const [data1, data2] = getDataFromPath(filepath1, filepath2);

  const keys1 = _.keys(data1).sort();
  const keys2 = _.keys(data2).sort();
  const keys = _.union(keys1, keys2);

  /* eslint-disable no-param-reassign */
  let result = keys.reduce((acc, key) => {
    if (_.includes(keys1, key) && _.includes(keys2, key) && data1[key] !== data2[key]) {
      acc += `\t- ${key}: ${data1[key]}\n\t+ ${key}: ${data2[key]}\n`;
      return acc;
    }

    if (!_.includes(keys2, key)) {
      acc += `\t- ${key}: ${data1[key]}\n`;
      return acc;
    }

    if (_.includes(keys2, key) && !_.includes(keys1, key)) {
      acc += `\t+ ${key}: ${data2[key]}\n`;
      return acc;
    }

    acc += `\t  ${key}: ${data1[key]}\n`;
    return acc;
  }, '');

  result = `{\n${result}}`;
  return result;
  /* eslint-enable no-param-reassign */
}

module.exports = findDiff;
