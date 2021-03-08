const path = require('path');

const config = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "worker-timeout",
        libraryTarget: "umd"
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
            }
        ]
    }
}

module.exports = config;