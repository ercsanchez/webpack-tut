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
    publicPath: '/static/'
  },
  mode: 'production',
  // only splits commmon dependencies of each bundle.js into a single chunk
  // and cache it separately
  // deps that are not common to all bundles are not split
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000, // only deps with byte size exceeding minSize are extracted into a separate chunk
      automaticNameDelimiter: "_",
    }
  },
  // for testing production build files
  devServer: {
    // contentBase: absolutePathToDist,
    // index: 'index.html',
    // writeToDisk: true,
    static: {
      directory: path.resolve(__dirname, './dist')
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
      // which bundle.js files to link/reference to this html | entry['name']
      // no need to add the chunk referring to common dependencies (vendor) | automatically done by webpack
      // chunks: ['hello-world'],
      title: 'Hello world',
      template: 'src/page-template.hbs',
      description: 'Hello World',
      // don't minify to see code formatted | minify if for production
      minify: false,
    }),
  ]
}