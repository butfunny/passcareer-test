const path = require("path");


module.exports = {
    entry: {
        "client-loader": "./src/app-loader.jsx"
    },
    mode: "development",
    output: {
        path: path.join(__dirname, "dev/assets/js"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-syntax-import-meta",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-json-strings",
                            "@babel/plugin-proposal-optional-chaining"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
};
