import { Command } from "commander";
import open from "open";

export function docsCommand(program: Command) {
    program.command("docs")
        .description("Opens the official MunsterJS documentation.")
        .action(async () => {
            const docsUrl = 'https://munster-dev.github.io/docs/';
            await open(docsUrl);
            console.log(`Documentation url : ${docsUrl}`);
        });
}