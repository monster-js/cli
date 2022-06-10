import { basename, resolve } from 'path';
import { getConfig } from '../../../../utils/get-config';
import { fileExistsChecker } from '../../../../utils/file-exists-checker';
import { writeFile } from '../../../../utils/write-file';
import { logCreate } from '../../../../utils/log-create';

export function generateComponentStyle(name: string) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.appRootDir || '', name);
    const fullStylePath = resolve(fullDirPath, `${baseName}.styles.scss`)


    // check if files don't exists
    // if yes, then throw an error
    const fileExists = fileExistsChecker(fullStylePath, `Unable to create new file. ${fullStylePath} file already exists.`);
    if (fileExists) {
        return;
    }


    // if not, create the files
    writeFile(fullStylePath, '');
    logCreate(`${fullStylePath}`);
}
