import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config = {
  mode: "production",
  entry: {
    main: "./app.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].buldle.js",
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
    // import 代码不用补全这些文件结尾
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

module.exports = config;
