const path = require('path');

const config = {
    mode: "production",
    entry: "./src/index.ts",
    target: "es5",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "set-worker-timer",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".js"]
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
                    configFile: "tsconfig.prod.json"
                }
            }
        ]
    }
}

module.exports = config;