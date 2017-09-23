var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/index.jsx",

  output: {
    path: path.join(__dirname, "./bundles"),
    filename: "app.bundle.js",
    publicPath: "http://localhost:3000/bundles/"
  },

  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.es6$/],
        exclude: /node_modules/,
        loaders: [
          "react-hot-loader",
          "babel-loader?presets[]=es2015&presets[]=react"
        ]
      },
      {
        test: [/\.scss$/, /\.css$/],
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["*", ".js", ".jsx", ".css"]
  }
};
