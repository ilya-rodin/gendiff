#!/usr/bin/env node

const { Command } = require('commander');
const findDiff = require('../src/app');

const program = new Command();

program
  .name('gendiff')
  // FIXME: callback in action method doesn't return a files path.
  //  Need to fix this.
  .action((filepath1, filepath2) => {
    console.log(findDiff(filepath1, filepath2));
  })
  .usage('[options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0');

program
  .helpOption('-h --help', 'output usage information')
  .option('-f --format <type>', 'output format');

program.parse();
