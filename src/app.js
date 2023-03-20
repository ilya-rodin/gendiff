const _ = require('lodash');
const fs = require('node:fs');

function findDiff(file1Path, file2Path) {
  const data1 = JSON.parse(fs.readFileSync(file1Path));
  const data2 = JSON.parse(fs.readFileSync(file2Path));

  const keys1 = _.keys(data1).sort();
  const keys2 = _.keys(data2).sort();
  const keys = _.union(keys1, keys2);

  return keys.reduce((acc, key) => {
    if (!_.includes(keys2, key)) {
      acc += `\t- ${key}: ${data1[key]}\n`;
      return acc;
    } else if (_.includes(keys, key) && data1[key] !== data2[key]) {
      acc += `\t- ${key}: ${data1[key]}\n\t+ ${key}: ${data2[key]}\n`;
      return acc;
    } else {
      acc += `\t  ${key}: ${data1[key]}\n`;
      return acc;
    }
  }, ``);
}

module.exports = findDiff;
