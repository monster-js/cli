import { green } from 'chalk';

export function logCreate(message: string) {
    console.log(green(`[CREATE]: ${message}`));
}
