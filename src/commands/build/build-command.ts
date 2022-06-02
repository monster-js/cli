import { Command } from "commander";
import { webpack } from "webpack";
import { ObjectInterface } from "../../interfaces/object.interface";
import { getWebpackConfig } from "../../utils/get-webpack-config";

export function buildCommand(program: Command) {
    program.command("build")
        .description("Build your application")
        .option("--env <value>", "Build the file using specific environment", 'dev')
        .action((options: ObjectInterface) => {
            const env = options.env;
            const webpackConfig = getWebpackConfig();
            const config = webpackConfig({ environment: env });
            const compiler = webpack(config);
            compiler.run((err, res) => {
                if (err) {
                    console.error(err);
                }
            });
        });
}