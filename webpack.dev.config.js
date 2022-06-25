const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin'); // not needed during dev
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // not needed during dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const absolutePathToDist = path.resolve(__dirname, './dist');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: absolutePathToDist,
    // publicPath: 'dist/',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
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
        ],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024
          }
        }
      },
      {
        test: /\.txt/,
        type: 'asset/source'
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', // remove all files in dist folder | default behavior of plugin
        path.join(process.cwd(), 'build/**/*')  // additional folder to clean
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Hello world',
      template: 'src/page-template.hbs',
      description: 'Hello World'
    }),
  ]
}