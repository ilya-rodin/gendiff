import _ from 'lodash';

const indentTwoOrSix = (depth, spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return ' '.repeat(indentSize - 2);
};

const indentFourOrEight = (depth, spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return ' '.repeat(indentSize);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const lines = _.entries(data).map(
    ([key, value]) => `${indentFourOrEight(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${indentFourOrEight(depth)}}`;
};

export default (tree) => {
  const iter = (diff, depth = 1) => diff.map((node) => {
    switch (node.type) {
      case 'deleted':
        return `${indentTwoOrSix(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'added':
        return `${indentTwoOrSix(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed': {
        return `${indentTwoOrSix(depth)}- ${node.key}: ${stringify(
          node.value1,
          depth,
        )}\n${indentTwoOrSix(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      }
      case 'unchanged':
        return `${indentFourOrEight(depth)}${node.key}: ${stringify(node.value, depth)}`;
      case 'nested': {
        const lines = iter(node.children, depth + 1);
        return `${indentFourOrEight(depth)}${node.key}: {\n${lines.join(
          '\n',
        )}\n${indentFourOrEight(depth)}}`;
      }
      default:
        throw new Error('Unsupported type');
    }
  });

  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
