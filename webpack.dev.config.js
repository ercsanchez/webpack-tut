const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin'); // not needed during dev
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // not needed during dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const absolutePathToDist = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    'hello-world': './src/hello-world.js',
    'kiwi': './src/kiwi.js'
  },
  output: {
    filename: '[name].js',
    path: absolutePathToDist,
    // publicPath: 'http://the-most-awesome=website.com/',
    // publicPath: 'dist/',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    // contentBase: absolutePathToDist,
    // index: 'index.html',
    // writeToDisk: true,
    static: {
      directory: absolutePathToDist
    },
    port: 9000,
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    },
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.(css)$/,
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /\.module\.(scss|sass)$/,
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "sass-loader"
        ],
        // include: /\.module\.(scss|sass)$/,
      },

      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties'],
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      }
    ]
  },
  plugins: [
    // new TerserPlugin(), // not needed during dev
    // new MiniCssExtractPlugin({
    //   filename: 'styles.[contenthash].css',
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', // remove all files in dist folder | default behavior of plugin
        path.join(process.cwd(), 'build/**/*')  // additional folder to clean
      ]
    }),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello world',
      // filename: 'subfolder/custom_filename.html',
      // meta: {
      //   description: 'Some description'
      // }
      chunks: ['hello-world'],
      filename: 'hello-world.html',
      template: 'src/page-template.hbs',
      description: 'Hello World'
    }),
    new HtmlWebpackPlugin({
      title: 'Kiwi',
      chunks: ['kiwi'],
      filename: 'kiwi.html',
      template: 'src/page-template.hbs',
      description: 'Kiwi'
    }),
  ]
}