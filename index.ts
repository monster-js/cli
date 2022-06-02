#! /usr/bin/env node
import { Command } from 'commander';
import packageJson from './package.json';
import { buildCommand } from './src/commands/build/build-command';
import { docsCommand } from './src/commands/docs/docs-command';
import { generateCommand } from './src/commands/generate/generate-command';
import { newCommand } from './src/commands/new/new-command';

const program = new Command();

program.name('MonsterJS Cli')
    .description('A command-line interface to initialize, develop, scaffold, and maintain MonsterJS applications.')
    .version(packageJson.version);

newCommand(program);
docsCommand(program);
generateCommand(program);
buildCommand(program);

program.parse();

// run webpack in nodejs: https://masteringjs.io/tutorials/webpack/node
