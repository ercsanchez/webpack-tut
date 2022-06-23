const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin'); // already included in production by webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    // publicPath: 'http://the-most-awesome=website.com/',
    // publicPath: 'dist/',
    publicPath: ''
  },
  mode: 'production',
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /\.module\.(css)$/,
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /\.module\.(scss|sass)$/,
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    // new TerserPlugin(), // already included in production by webpack
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', // remove all files in dist folder | default behavior of plugin
        path.join(process.cwd(), 'build/**/*')  // additional folder to clean
      ]
    }),
    new HtmlWebpackPlugin({
      // filename: 'subfolder/custom_filename.html',
      // meta: {
      //   description: 'Some description'
      // }
      title: 'Hello world',
      template: 'src/index.hbs',
      description: 'Some description'
    }),
  ]
}