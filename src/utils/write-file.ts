import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export function writeFile(path: string, contents: string) {
    mkdirSync(dirname(path), { recursive: true});
    writeFileSync(path, contents);
}