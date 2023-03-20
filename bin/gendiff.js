#!/usr/bin/env node

import { Command, Option } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0');

program
  .helpOption('-h --help', 'output usage information')
  .addOption(new Option('-f --format <type>', 'output format'));

program.parse(process.argv);
