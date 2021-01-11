// import * as path from "path";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: "production",
  entry: {
    main: "./src/index.ts",
    app: "./src/app.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:8].buldle.js",
  },
  loader: {
    test: /\.ts$/,
    use: ["babel-loader", "ts-loader"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

module.exports = config;
