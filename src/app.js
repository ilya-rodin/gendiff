const getParsedData = require('./parsers');
const generateDiff = require('./generator');

const getDiff = (filename1, filename2) => {
  const [data1, data2] = getParsedData(filename1, filename2);
  const diff = generateDiff(data1, data2);

  return diff;
};

module.exports = getDiff;
