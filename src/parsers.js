const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const getDataPath = (fileName1, fileName2) => {
  const absolutePath1 = path.resolve(process.cwd(), fileName1);
  const absolutePath2 = path.resolve(process.cwd(), fileName2);

  return [absolutePath1, absolutePath2];
};

const getParsedData = (fileName1, fileName2) => {
  const file1Format = fileName1.split('.')[1];
  const file2Format = fileName2.split('.')[1];

  const [path1, path2] = getDataPath(fileName1, fileName2);

  let data1;
  let data2;
  if ((file1Format === 'yml' && file2Format === 'yml')
      || (file1Format === 'yaml' && file2Format === 'yaml')) {
    data1 = yaml.load(fs.readFileSync(path1, { encoding: 'utf-8' }));
    data2 = yaml.load(fs.readFileSync(path2, { encoding: 'utf-8' }));
  } else {
    data1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
    data2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));
  }
  return [data1, data2];
};

module.exports = getParsedData;
