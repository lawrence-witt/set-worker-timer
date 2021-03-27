const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./demo/index.html"
});

const config = {
    mode: "development",
    entry: "./demo/index.ts",
    target: "es5",
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
                    configFile: "tsconfig.json"
                }
            }
        ]
    },
    devServer: {
        port: 3000,
        host: "0.0.0.0"
    },
    devtool: "inline-source-map",
    plugins: [htmlPlugin]
}

module.exports = config;