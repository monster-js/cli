const { resolve } = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { EnvironmentPlugin } = require('webpack');

module.exports = (env, args) => {
    const { environment } = require(`../src/environments/environment.${env.environment}`);
    return {
        mode: args.mode,
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx']
        },
        plugins: [
            new EnvironmentPlugin(environment),
            new CopyPlugin({
                patterns: [
                    { from: "src/index.html", to: "" },
                    { from: "src/assets", to: "assets" }
                ],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader'
                    ],
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /(\.ts$|\.tsx$)/,
                    use: {
                        loader: 'babel-loader'
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    use: ['file-loader'],
                    exclude: /(node_modules|bower_components)/
                }
            ]
        },
        devServer: {
            static: './src',
            compress: true,
            historyApiFallback: {
                index: 'index.html'
            }
        },
        devtool: "source-map"
    };
};

//     ├── assets/
//     └── app/
//         ├── root.module.ts
//         ├── root.logc.ts
//         ├── root.view.tsx
//         └── root.style.scss