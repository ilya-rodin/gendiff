const indent = (depth, spacesCount) => {
  const symbolsCount = 2;
  return ' '.repeat(depth * spacesCount - symbolsCount);
};
