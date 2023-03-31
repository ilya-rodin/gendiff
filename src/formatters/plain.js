import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `${data}`;
  }
  return data;
};

const getPath = (node, current) => {
  if (current !== '') {
    return `${current}.${node.key}`;
  }
  return `${node.key}`;
};

export default (tree) => {
  const iter = (diff, path) => diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const currentPath = getPath(node, path);
      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(
            node.value,
          )}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(
            node.value1,
          )} to ${stringify(node.value2)}`;
        case 'nested':
          return iter(node.children, currentPath).join('\n');
        default:
          throw new Error('Unknown type');
      }
    });
  return iter(tree, '').join('\n');
};
