const path = require('path');

const outputPath = path.resolve(__dirname, "../../dist");
const tsconfigPath = path.resolve(__dirname, "../typescript/tsconfig.umd.json");

const config = {
    mode: "production",
    entry: "./src/index.ts",
    target: "es5",
    output: {
        path: outputPath,
        filename: "index.js",
        library: {
            name: "set-worker-timer",
            type: "umd"
        }
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.worker\.ts?$/,
                loader: 'worker-loader',
                options: { 
                    inline: 'no-fallback' 
                }
            },
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                options: {
                    configFile: tsconfigPath
                }
            }
        ]
    }
}

module.exports = config;