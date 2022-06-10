import { basename, resolve } from 'path';
import { getConfig } from '../../../../utils/get-config';
import { fileExistsChecker } from '../../../../utils/file-exists-checker';
import { readFile } from '../../../../utils/read-file';
import { paths } from '../../../../paths';
import { kebabToCamelCase } from '../../../../utils/kebab-to-camel-case';
import { writeFile } from '../../../../utils/write-file';
import { logCreate } from '../../../../utils/log-create';
import { camelToKebab } from '../../../../utils/camel-to-kebab';

export function generateClassComponent(name: string) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.appRootDir || '', name);
    const fullLogicPath = resolve(fullDirPath, `${baseName}.component.tsx`)


    // check if files don't exists
    // if yes, then throw an error
    const fileExists = fileExistsChecker(fullLogicPath, `Unable to create new file. ${fullLogicPath} file already exists.`);
    if (fileExists) {
        return;
    }


    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const logic = readFile(paths.component)
        .replace(/__ComponentNameCamelCase__/g, camelCaseName)
        .replace(/__ComponentNameKebabCase__/g, camelToKebab(baseName));


    writeFile(fullLogicPath, logic);
    logCreate(`${fullLogicPath}`);
}
