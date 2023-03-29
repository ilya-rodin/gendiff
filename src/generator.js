const _ = require('lodash');
const getParsedData = require('./parsers');

const generateDiff = (data1, data2) => {
  const keys1 = _.sortBy(_.keys(data1));
  const keys2 = _.sortBy(_.keys(data2));
  const keys = _.union(keys1, keys2);

  return keys.reduce((acc, key) => {
    if (!_.includes(data2, key)) {
      acc[key] = {
        type: 'deleted',
        value: data1[key],
      };
      return acc;
    }
    if (!_.includes(data2, key)) {
      acc[key] = {
        type: 'added',
        value: data1[key],
      };
      return acc;
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      acc[key] = {
        children: generateDiff(data1[key], data2[key]),
        type: 'nested',
      };
      return acc;
    }
    if (!_.isEqual(data1[key], data2[key])) {
      acc[key] = {
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
      return acc;
    }
    acc[key] = {
      key,
      type: 'unchanged',
      value: data1[key],
    };
    return acc;
  }, {});
};

const [data1, data2] = getParsedData('../__fixtures__/file1.json', '../__fixtures__/file2.json');

console.log(JSON.stringify(generateDiff(data1, data2), null, 2));

module.exports = generateDiff;
