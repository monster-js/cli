import { readFileSync } from 'fs';

export function readFile(path: string) {
    return readFileSync(path, 'utf-8');
}
