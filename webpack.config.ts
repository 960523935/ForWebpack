import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config = {
  mode: "production",
  entry: {
    main: "./src/msg/index.ts",
    // use: "./src/msg/use.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].buldle.js",
    libraryTarget: "umd",
    library: "CJMsg",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["ts-loader"] },
      {
        test: /\.less$/,
        use: [
          {
            loader: "css-loader",
            options: {},
          },
          {
            loader: "postcss-loader",
            options: {
              // execute: true,
            },
          },
          "less-loader",
        ],
      },
    ],
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
