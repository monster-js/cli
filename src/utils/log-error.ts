import { red } from 'chalk';

export function logError(message: string) {
    console.log(red(`[ERROR]: ${message}`));
}
