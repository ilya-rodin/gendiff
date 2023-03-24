#!/usr/bin/env node

const { Command } = require("commander");
const genDiff = require("../src/app");

const program = new Command();

program
  .name("gendiff")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .description("Compares two configuration files and shows a difference.")
  .version("0.8.0");

program
  .helpOption("-h --help", "output usage information")
  .option("-f --format <type>", "output format");

program.parse();
