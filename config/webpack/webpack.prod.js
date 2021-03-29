const path = require('path');

const env = process.env.NODE_ENV;

/* if (env !== "umd" || env !== "es") {
    console.log(env, typeof env)
    throw new Error('NODE_ENV argument of either "umd" or "es" is required.');
} */

const settings = {
    umd: {
        output: {
            filename: "index.js",
            libraryTarget: "umd"
        },
        tsConfig: path.resolve(process.cwd(), 'config/typescript/tsconfig.umd.json')
    },
    es: {
        output: {
            filename: "index.module.js"
        },
        tsConfig: path.resolve(process.cwd(), 'config/typescript/tsconfig.module.json')
    }
}[env];

const config = {
    mode: "production",
    entry: "./src/index.ts",
    target: "es5",
    output: {
        path: path.resolve(process.cwd(), "dist"),
        library: "set-worker-timer",
        ...settings.output
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
                    configFile: settings.tsConfig
                }
            }
        ]
    }
}

module.exports = config;