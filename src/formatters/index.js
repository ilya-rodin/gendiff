const formatStylish = require('./stylish');
const formatPlain = require('./plain');

module.exports = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Unsupported format type');
  }
};
