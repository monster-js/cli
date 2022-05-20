import { basename, resolve } from 'path';
import { ObjectInterface } from "../../../../interfaces/object.interface";
import { getConfig } from '../../../../utils/get-config';
import { fileExistsChecker } from '../../../../utils/file-exists-checker';
import { readFile } from '../../../../utils/read-file';
import { paths } from '../../../../paths';
import { kebabToCamelCase } from '../../../../utils/kebab-to-camel-case';
import { writeFile } from '../../../../utils/write-file';
import { logCreate } from '../../../../utils/log-create';
import { logError } from '../../../../utils/log-error';

export function generateMultipleFilesComponent(name: string) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.appRootDir || '', name);
    const fullLogicPath = resolve(fullDirPath, `${baseName}.component.tsx`)
    const fullStylePath = resolve(fullDirPath, `${baseName}.styles.scss`)

    if (!config) {
        return;
    }

    // check if files don't exists
    // if yes, then throw an error
    const fileExists1 = fileExistsChecker(fullLogicPath, `Unable to create new file. ${fullLogicPath} file already exists.`);
    const fileExists2 = fileExistsChecker(fullStylePath, `Unable to create new file. ${fullStylePath} file already exists.`);
    if (fileExists1 || fileExists2) {
        logError('Failed to create new component.');
        return;
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const logic = readFile(paths.component)
        .replace(/__ComponentNameCamelCase__/g, camelCaseName)
        .replace(/__ComponentNameKebabCase__/g, baseName);
    writeFile(fullLogicPath, logic);
    logCreate(`${fullLogicPath}`);
    writeFile(fullStylePath, '');
    logCreate(`${fullStylePath}`);
}
