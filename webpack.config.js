const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let common = {
    devtool: process.env.NODE_ENV === "production"
        ? null
        : "#inline-eval-source-map",
    plugin: process.env.NODE_ENV === "production"
        ? [
            new webpack.optimize.UglifyJsPlugin({
                output: { comments: require("uglify-save-license") }
            }),
        ]
        : [],
    resolve: { extensions: ["", ".ts", ".tsx", ".js"] },
    ts: {
        compilerOptions: {
            "sourceMap": process.env.NODE_ENV === "production"
                ? false
                : true
        }
    }
};

module.exports = [
    Object.assign({},
        common,
        {
            entry: {
                index: ["babel-polyfill", "./src/public/js/index.tsx"]
            },
            module: {
                loaders: [{
                    test: /\.tsx?$/,
                    loader: "babel-loader?presets[]=es2015!ts-loader"
                }]
            },
            output: {
                filename: "lib/public/js/[name].js"
            },
            plugins: common.plugin.concat([
                new CopyWebpackPlugin(
                    [{ from: "src/public/", to: "lib/public/" }],
                    {
                        ignore: [
                            "test/",
                            "*.ts",
                            "*.tsx"
                        ]
                    })
            ])
        }
    ),
    Object.assign({},
        common,
        {
            entry: {
                index: ["babel-polyfill", "./src/index.ts"],
                "test/test": ["babel-polyfill", "./src/test/test.ts"]
            },
            externals: /^(?!\.)/,
            module: {
                loaders: [{
                    test: /\.tsx?$/,
                    loader: "babel-loader?presets[]=modern-node!ts-loader"
                }]
            },
            node: {
                __dirname: false
            },
            output: {
                filename: "lib/[name].js",
                libraryTarget: "commonjs2"
            }
        }
    )
];
