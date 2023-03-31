const formatStylish = require('./stylish');

module.exports = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Unsupported format type');
  }
};
