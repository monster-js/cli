import { ncp } from "ncp";
import { resolve } from "path";
import { ObjectInterface } from "../../interfaces/object.interface";
import { paths } from "../../paths";
import { fileExistsChecker } from "../../utils/file-exists-checker";
import { execSync } from 'child_process';
import { Command } from "commander";

export function newCommand(program: Command) {

    program.command("new <name>")
        .description("Generate a component files")
        .option("-s, --single", "To generate a single file component", false)
        .action((name: string, options: ObjectInterface) => {
            const destination = resolve(process.cwd(), name);
            const folderExists = fileExistsChecker(destination, `Unable to generate new app. The folder named ${name} already exists.`);
            if (folderExists) {
                return;
            }
            ncp(paths.newApp, destination, function(error) {
                if (error) {
                    return console.error(error);
                }

                console.log("Installing packages ...");
                execSync(`cd ${name} && npm install`, {stdio: 'inherit'});
                console.log("Done");
            });
        });
}
