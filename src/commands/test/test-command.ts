import { Command } from "commander";
import { ObjectInterface } from "../../interfaces/object.interface";

import karma from 'karma';
import { generateKarmaConfig } from "./karma.conf";
const parseConfig = karma.config.parseConfig
const Server = karma.Server

export function testCommand(program: Command) {
    program.command("test")
        .description("Test your application")
        .option("--env <value>", "Test the project using the specified environment.", 'dev')
        .option("--watch", "Runs the test and watch for changes.", false)
        .action((options: ObjectInterface) => {
            const webpackConfig = {
                environment: options.env
            };
            const karmaConfig = generateKarmaConfig(webpackConfig);

            karmaConfig.singleRun = !options.watch;

            parseConfig(null, karmaConfig, {promiseConfig: true, throwErrors: true})
                .then(karmaConfig => {
                    const server = new Server(karmaConfig, function doneCallback(exitCode) {
                        console.log('Karma has exited with ' + exitCode)
                        process.exit(exitCode)
                    });
                    server.start();
                });

        });
}

