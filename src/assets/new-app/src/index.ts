import 'reflect-metadata';
import './styles.scss';
import { Program } from '@monster-js/core';
import { RootModule } from './app/root.module';

const program = new Program();

program.bootstrapModule(RootModule);

program.run();