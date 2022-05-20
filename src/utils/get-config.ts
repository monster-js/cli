import { existsSync } from 'fs';
import { resolve } from 'path';
import { red } from 'chalk';
import { MunsterConfigInterface } from '../interfaces/munster-config.interface';

export function getConfig(): MunsterConfigInterface | null {
    const currentPath = process.cwd();
    const configPath = resolve(currentPath, '.configs/munster.json')

    if (!existsSync(configPath)) {
        console.log(red('[ERROR]: This command must be run inside a MunsterJs app. MunsterJS config file not found!'));
        return null;
    }
    return require(configPath);
}
