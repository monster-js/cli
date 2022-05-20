import 'reflect-metadata';
import './styles.scss';
import { Program } from '@munster-dev/core';
import { RootModule } from './app/root.module';

const program = new Program();

program.bootstrapModule(RootModule);

program.run();