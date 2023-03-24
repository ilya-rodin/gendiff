const _ = require('lodash');
const getParsedData = require('./parsers');

const genDiff = (filename1, filename2) => {
  const [data1, data2] = getParsedData(filename1, filename2);
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
};

module.exports = genDiff;
