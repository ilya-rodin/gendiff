const _ = require('lodash');
const fs = require('node:fs');
const path = require('path');

function getDataFromPath(path1, path2) {
  const resolvedPath1 = path.resolve(path1);
  const resolvedPath2 = path.resolve(path2);
  const data1 = JSON.parse(fs.readFileSync(resolvedPath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(resolvedPath2, 'utf-8'));

  return [data1, data2];
}

function findDiff(path1, path2) {
  const [data1, data2] = getDataFromPath(path1, path2);

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
