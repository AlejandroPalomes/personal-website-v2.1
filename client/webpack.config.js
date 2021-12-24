var path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
require("babel-polyfill");

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    filename: "bundle.js",
    path: __dirname + "../../server/public/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8000/",
    },
  },
  resolve: {
    // extensions: ['.tsx', '.ts', '.js'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        exclude: /(node_modules)/,
        test: /\.js$/,
        use: "babel-loader",
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
			},
			{
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
        // options: { appendTsSuffixTo: [/\.vue$/] }
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
			// },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      favicon: "./src/assets/img/favicon/favicon.png",
      filename: "index.html",
      template: "index.html",
      inject: false, //prevent webpack to inject the assets into the html
    }),
    new Dotenv({}),
    new webpack.DefinePlugin({
    	'process.env': {
    		'APIURL': JSON.stringify(process.env.APIURL)
    	}
    })
	],
};
