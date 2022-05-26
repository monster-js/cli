#! /usr/bin/env node
import { Command } from 'commander';
import packageJson from './package.json';
import { docsCommand } from './src/commands/docs/docs-commands';
import { generateCommand } from './src/commands/generate/generate-command';
import { newCommand } from './src/commands/new/new-command';

const program = new Command();

program.name('MonsterJS Cli')
    .description('A command-line interface to initialize, develop, scaffold, and maintain MonsterJS applications.')
    .version(packageJson.version);

newCommand(program);
docsCommand(program);
generateCommand(program);

program.parse();
