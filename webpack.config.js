const path = require('path');

const config = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "set-worker-timeout",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.worker\.ts?$/,
                loader: 'worker-loader',
                options: { inline: 'no-fallback' }
            },
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.webpack.json"
                }
            }
        ]
    }
}

module.exports = config;