const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./app.js",
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler",
    },
  },
  devServer: {
    static: path.join(__dirname, "src"),
    compress: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new Dotenv(),
  ],
};
