import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config = {
  mode: "production",
  devtool: "source-map",
  entry: {
    cjmsg: "./src/msg/index.tsx",
    use: "./src/msg/use.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "[name].[contenthash:8].js",
    filename: "[name].js",
    libraryTarget: "umd",
    library: "CJMsg",
    libraryExport: "default",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["ts-loader"] },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              esModule: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[local]__[hash:5]" },// className模块化
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
  // externals: {
  //   react: {
  //     commonjs: "react",
  //     commonjs2: "react",
  //     amd: "react",
  //     root: "React",
  //   },
  //   "react-dom": {
  //     commonjs: "react-dom",
  //     commonjs2: "react-dom",
  //     amd: "react-dom",
  //     root: "ReactDOM",
  //   },
  // },
  devServer: {
    port: "5200",
    inline: true,
    hot: true,
  },
};

module.exports = config;
