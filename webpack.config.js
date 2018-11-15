const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const moduleObj = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.(scss|css)$/,
      use: [
        // "style-loader",
        // MiniCssExtractPlugin.loader,
        // "css-loader",
        // "sass-loader"
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader", // translates CSS into CommonJS
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
          options: { sourceMap: true }
        }
      ]
    }
  ]
};
const client = {
  entry: {
    client: "./src/client/index.js"
  },
  target: "web",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/public")
  },
  devtool: "source-map",
  mode: "development",
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/client/index.html"
    })
  ]
};
const server = {
  entry: {
    server: "./src/server/index.js"
  },
  target: "node",
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  //module: moduleObj,
  externals: [nodeExternals()]
};
module.exports = [client, server];
