import { Command } from "commander";
import open from "open";

export function docsCommand(program: Command) {
    program.command("docs")
        .description("Opens the official MonsterJS documentation.")
        .action(async () => {
            const docsUrl = 'https://monster-js.github.io/docs/';
            await open(docsUrl);
            console.log(`Documentation url : ${docsUrl}`);
        });
}