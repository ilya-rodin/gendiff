const _ = require('lodash');

const generateDiff = (data1, data2) => {
  const keys1 = _.sortBy(_.keys(data1));
  const keys2 = _.sortBy(_.keys(data2));
  const keys = _.union(keys1, keys2);

  return keys.map((key) => {
    if (!_.includes(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (!_.includes(data2, key)) {
      return {
        key,
        type: 'added',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: generateDiff(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: data1[key],
    };
  });
};

module.exports = generateDiff;
