const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  mode: "development",
  target: ["web", "es5"],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  output: {
    path: path.join(__dirname, "build/"),
    filename: "script.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false,
      hash: true,
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["url-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
