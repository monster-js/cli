import { basename, resolve } from 'path';
import { getConfig } from '../../../../utils/get-config';
import { fileExistsChecker } from '../../../../utils/file-exists-checker';
import { readFile } from '../../../../utils/read-file';
import { paths } from '../../../../paths';
import { kebabToCamelCase } from '../../../../utils/kebab-to-camel-case';
import { writeFile } from '../../../../utils/write-file';
import { logCreate } from '../../../../utils/log-create';
import { logError } from '../../../../utils/log-error';
import { camelToKebab } from '../../../../utils/camel-to-kebab';

export function generateClassComponent(name: string) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.appRootDir || '', name);
    const fullLogicPath = resolve(fullDirPath, `${baseName}.component.tsx`)
    const fullStylePath = resolve(fullDirPath, `${baseName}.styles.scss`)
    const fullTestPath = resolve(fullDirPath, `${baseName}.test.ts`)

    if (!config) {
        return;
    }

    // check if files don't exists
    // if yes, then throw an error
    const fileExists1 = fileExistsChecker(fullLogicPath, `Unable to create new file. ${fullLogicPath} file already exists.`);
    const fileExists2 = fileExistsChecker(fullStylePath, `Unable to create new file. ${fullStylePath} file already exists.`);
    const fileExists3 = fileExistsChecker(fullStylePath, `Unable to create new file. ${fullTestPath} file already exists.`);
    if (fileExists1 || fileExists2 || fileExists3) {
        logError('Failed to create new component.');
        return;
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const logic = readFile(paths.component)
        .replace(/__ComponentNameCamelCase__/g, camelCaseName)
        .replace(/__ComponentNameKebabCase__/g, camelToKebab(baseName));
    const test = readFile(paths.componentTest)
        .replace(/__ComponentNameCamelCase__/g, camelCaseName)
        .replace(/__ComponentNameKebabCase__/g, camelToKebab(baseName));

    writeFile(fullLogicPath, logic);
    logCreate(`${fullLogicPath}`);
    writeFile(fullStylePath, '');
    logCreate(`${fullStylePath}`);
    writeFile(fullTestPath, test);
    logCreate(`${fullTestPath}`);
}
