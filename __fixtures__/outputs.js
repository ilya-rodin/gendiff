const baseDiffOut = [
  {
    key: 'common',
    type: 'deleted',
    value: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { key: 'value', doge: { wow: '' } },
    },
  },
  { key: 'group1', type: 'deleted', value: { baz: 'bas', foo: 'bar', nest: { key: 'value' } } },
  { key: 'group2', type: 'deleted', value: { abc: 12345, deep: { id: 45 } } },
  { key: 'group3', type: 'deleted' },
];

module.exports = baseDiffOut;
