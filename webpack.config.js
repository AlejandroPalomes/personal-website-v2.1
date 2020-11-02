const webpack = require('webpack');
module.exports = {
    mode: "production", // "production" | "development" | "none"  -> we can enable webpack's built-in optimizations that correspond to each environment.
    entry: './server/app.js', // string | object | array
    module: {
        rules: [
            {
                test: /\.js$/, //Regular expression (all files finished with .js)
                exclude: /(node_modules)/,//excluded node_modules
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]  //Preset used for env setup
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader", //resolves all html dependencies
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]',
                        esModule: false,
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ]
}