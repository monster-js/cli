import { existsSync } from 'fs';
import { resolve } from 'path';
import { red } from 'chalk';
import { MonsterConfigInterface } from '../interfaces/monster-config.interface';

export function getConfig(): MonsterConfigInterface | null {
    const currentPath = process.cwd();
    const configPath = resolve(currentPath, '.monster/monster.json')

    if (!existsSync(configPath)) {
        console.log(red('[ERROR]: This command must be run inside a MonsterJS app. MonsterJS config file not found!'));
        return null;
    }
    return require(configPath);
}
