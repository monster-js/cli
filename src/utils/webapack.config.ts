import { EnvironmentPlugin } from "webpack";
import CopyWebpackPlugin from 'copy-webpack-plugin';
const path = require('path');

interface WebpackConfigArgsInterface {
    output?: string;
}

const DEFAULT_OUTPUT = 'dist';

export const WebpackConfig = (env: any, args: WebpackConfigArgsInterface = {}) => {
    const environment = require(path.resolve(process.cwd(), `src/environments/${env.environment}.json`));
    return {
        mode: environment.MODE, // development | production
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(process.cwd(), args.output || DEFAULT_OUTPUT),
        },
        devServer: {
            static: './src',
            host: 'localhost',
            historyApiFallback: {
                index: 'index.html'
            }
        },
        plugins: [
            new EnvironmentPlugin(environment),
            new CopyWebpackPlugin({
                patterns: [
                    { from: "src/index.html", to: "" },
                    { from: "src/assets", to: "assets" }
                ],
            })
        ],
        module: {
            rules: [
                {
                    test: /(\.css|\.scss|\.sass)$/i,
                    use: [
                        require.resolve('@monster-js/transformer/css'),
                        require.resolve('style-loader'),
                        require.resolve('css-loader'),
                        require.resolve('sass-loader')
                    ],
                    include: [path.resolve(process.cwd(), 'src')],
                    exclude: [path.resolve(process.cwd(), 'src/assets')]
                },
                {
                    test: /\.(ts|tsx)$/i,
                    exclude: ['/node_modules/'],
                    use: {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                require.resolve("@babel/preset-env"),
                                require.resolve("@babel/preset-typescript")
                            ],
                            plugins: [
                                require.resolve("babel-plugin-transform-typescript-metadata"),
                                require.resolve("@monster-js/transformer/jsx"),
                                [require.resolve("@babel/plugin-proposal-decorators"), { "legacy": true }],
                                require.resolve("@babel/plugin-proposal-class-properties"),
                                require.resolve("@babel/plugin-transform-runtime")
                            ]
                        }
                    }
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|jpeg|ico)$/i,
                    type: 'asset',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        devtool: 'source-map'
    }
};
