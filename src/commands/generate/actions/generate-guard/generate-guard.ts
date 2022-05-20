import { basename, resolve } from "path";
import { ObjectInterface } from "../../../../interfaces/object.interface";
import { paths } from "../../../../paths";
import { fileExistsChecker } from "../../../../utils/file-exists-checker";
import { getConfig } from "../../../../utils/get-config";
import { kebabToCamelCase } from "../../../../utils/kebab-to-camel-case";
import { logCreate } from "../../../../utils/log-create";
import { logError } from "../../../../utils/log-error";
import { readFile } from "../../../../utils/read-file";
import { writeFile } from "../../../../utils/write-file";

export function generateGuard(name: string, options: ObjectInterface) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.rootDir || '', name);
    const fullPath = resolve(fullDirPath, `${baseName}.guard.ts`)

    if (!config) {
        return;
    }

    // check if files don't exists
    // if yes, then throw an error
    const fileExists1 = fileExistsChecker(fullPath, `Unable to create new file. ${fullPath} file already exists.`);
    if (fileExists1) {
        logError('Failed to create new guard.');
        return;
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const logic = readFile(paths.guard)
        .replace(/__GuardNameCamelCase__/g, camelCaseName);
    writeFile(fullPath, logic);
    logCreate(`${fullPath}`);
}