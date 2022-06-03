import { Command } from "commander";
import { webpack } from "webpack";
import { ObjectInterface } from "../../interfaces/object.interface";
import { WebpackConfig } from "../../utils/webapack.config";

export function buildCommand(program: Command) {
    program.command("build")
        .description("Build your application")
        .option("--env <value>", "Build the project using specific environment.", 'dev')
        .option("--output <value>", "The directory where it should output the bundles, assets and other files.", 'dist')
        .action((options: ObjectInterface) => {
            const env = options.env;
            const config = WebpackConfig({ environment: env }, { output:  options.output });
            const compiler = webpack(config);
            compiler.run((err, res) => {
                if (err) {
                    console.error(err);
                }
            });
        });
}