import { existsSync } from "fs";
import { logError } from './log-error';

export function fileExistsChecker(path: string, existsMessage: string, logExistsMessage: boolean = true) {
    if (existsSync(path)) {
        if (logExistsMessage) {
            logError(existsMessage);
        }
        return true;
    }
    return false;
}