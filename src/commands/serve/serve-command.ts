import { Command } from "commander";
import { webpack } from "webpack";
const WebpackDevServer = require('webpack-dev-server');
import { ObjectInterface } from "../../interfaces/object.interface";
import { getWebpackConfig } from "../../utils/get-webpack-config";

export function serveCommand(program: Command) {
    program.command("serve")
        .description("Build your application")
        .option("--env <value>", "Serve the project using specific environment", 'dev')
        .option("--port <value>", "Set the port of the local server")
        .option("--open", "Open a browser when server is ready", false)
        .action((options: ObjectInterface) => {
            const env = options.env;
            const webpackConfig = getWebpackConfig();
            const config = webpackConfig({ environment: env });

            const compiler = webpack(config);


            /**
             * Setup dev server port
             */
            const port = options.port || config.devServer.port || '4000';

            
            /**
             * Setup if open a web browser after serve
             */
            let open = false;
            if (options.hasOwnProperty('open')) {
                open = options.open;
            } else if(config.devServer?.open) {
                open = config.devServer.open;
            }


            const devServerOptions = {
                ...config.devServer,
                open: open,
                port: port
            };
            const server = new WebpackDevServer(devServerOptions, compiler);

            const runServer = async () => {
                await server.start();
            };

            runServer();

        });
}
