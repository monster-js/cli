import { green } from 'chalk';

export function logSuccess(message: string) {
    console.log(green(`[SUCCESS]: ${message}`));
}