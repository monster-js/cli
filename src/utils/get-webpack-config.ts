import { existsSync } from "fs";
import { resolve } from "path";
import { red } from 'chalk';

export function getWebpackConfig() {
    const currentPath = process.cwd();
    const configPath = resolve(currentPath, '.monster/webpack.config.js');
    if (!existsSync(configPath)) {
        console.log(red('[ERROR]: Missing webpack config inside .monster directory.'));
        return null;
    }

    return require(configPath);
}

