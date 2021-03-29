const path = require('path');

const env = process.env.NODE_ENV.trim();

if (env !== "umd" && env !== "es") {
    throw new Error('NODE_ENV argument of either umd or es is required.');
}

const resolveTsConfig = (format) => {
    return path.resolve(process.cwd(), `config/typescript/tsconfig.${format}.json`);
};

const settings = {
    umd: {
        output: {
            filename: "index.js",
            library: {
                name: "set-worker-timer",
                type: "umd"
            }
        },
        tsConfig: resolveTsConfig("umd"),
        experiments: {}
    },
    es: {
        output: {
            filename: "index.module.js",
            module: true,
            library: {
                type: "module"
            }
        },
        tsConfig: resolveTsConfig("module"),
        experiments: {
            outputModule: true
        }
    }
}[env];

const config = {
    mode: "production",
    entry: "./src/index.ts",
    target: "es5",
    output: {
        path: path.resolve(process.cwd(), "dist"),
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
    },
    experiments: settings.experiments
}

module.exports = config;