import { Command } from "commander";
import { webpack } from "webpack";
import WebpackDevServer from 'webpack-dev-server';
import { ObjectInterface } from "../../interfaces/object.interface";
import { WebpackConfig } from "../../utils/webpack.config";

export function serveCommand(program: Command) {
    program.command("serve")
        .description("Build your application")
        .option("--env <value>", "Serve the project using the specified environment.", 'dev')
        .option("--port <value>", "Set the port for the local development server", '4000')
        .option("--open", "Opens a browser when local development server is ready.", false)
        .action((options: ObjectInterface) => {
            const env = options.env;
            const config = WebpackConfig({ environment: env });

            const compiler = webpack(config);

            const devServerOptions = {
                ...config.devServer,
                open: options.open,
                port: options.port
            };
            const server = new WebpackDevServer(devServerOptions, compiler);

            const runServer = async () => {
                await server.start();
            };

            runServer();

        });
}
