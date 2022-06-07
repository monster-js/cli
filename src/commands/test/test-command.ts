import { Command } from "commander";
import { ObjectInterface } from "../../interfaces/object.interface";

import karma from 'karma';
import { generateKarmaConfig } from "./karma.conf";
const parseConfig = karma.config.parseConfig
const Server = karma.Server

export function testCommand(program: Command) {
    program.command("test")
        .description("Test your application")
        .option("--env <value>", "Serve the project using the specified environment.", 'dev')
        .action((options: ObjectInterface) => {
            const webpackConfig = {
                environment: options.env
            };
            parseConfig(null, generateKarmaConfig(webpackConfig), {promiseConfig: true, throwErrors: true})
                .then(karmaConfig => {
                    const server = new Server(karmaConfig, function doneCallback(exitCode) {
                        console.log('Karma has exited with ' + exitCode)
                        process.exit(exitCode)
                    });
                    server.start();
                });

        });
}

