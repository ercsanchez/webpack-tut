const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin'); // not needed during dev
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // not needed during dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const absolutePathToDist = path.resolve(__dirname, './dist');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
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
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [
    //     '**/*',
    //     path.join(process.cwd(), 'build/**/*')
    //   ]
    // }),
    new HtmlWebpackPlugin({
      title: 'Hello world',
      // filename: 'subfolder/custom_filename.html',
      // meta: {
      //   description: 'Some description'
      // }
      template: 'src/index.hbs',
      description: 'Some description'
    }),
  ]
}