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

export function generateFunctionTest(name: string) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.appRootDir || '', name);
    const fullTestPath = resolve(fullDirPath, `${baseName}.test.ts`)


    /**
     * check if files don't exists
     * if file exists, then throw an error
     */
    const fileExists = fileExistsChecker(fullTestPath, `Unable to create new file. ${fullTestPath} file already exists.`);
    if (fileExists) {
        return;
    }


    /**
     * if not, create the files
     */
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const test = readFile(paths.fnComponentTest)
        .replace(/__ComponentNameCamelCase__/g, camelCaseName)
        .replace(/__ComponentNameKebabCase__/g, camelToKebab(baseName));


    writeFile(fullTestPath, test);
    logCreate(`${fullTestPath}`);
}
