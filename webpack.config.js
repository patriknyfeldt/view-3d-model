const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        use: "vue-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", "vue"],
  },
  plugins: [new VueLoaderPlugin()],
};
