import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const lines = _.entries(data).map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `  ${indent(depth)}}`].join('\n');
};

const getStylishDiff = (node, depth, iter) => {
  switch (node.type) {
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed':
      return [
        `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`,
        `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`,
      ].join('\n');
    case 'nested':
      return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}\n  ${indent(depth)}}`;
    default:
      throw new Error(`Unknown type: '${node.type}'`);
  }
};

export default (tree) => {
  const iter = (nodes, depth = 1) => {
    const newNodes = nodes.map((node) => getStylishDiff(node, depth, iter));
    return newNodes.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};
