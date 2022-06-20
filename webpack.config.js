const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // publicPath: 'http://the-most-awesome=website.com/',
    publicPath: 'dist/',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // {
      //   test: /\.(css)$/,
      //   use : [
      //     'style-loader', 'css-loader'
      //   ]
      // },
      // {
      //   test: /\.(scss|sass)$/,
      //   use : [
      //     'style-loader', 'css-loader', 'sass-loader'
      //   ]
      // },
      // {
      //   test: /\.module\.(scss|sass)$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         importLoaders: 1,
      //         modules: true,
      //       },
      //     },
      //     "sass-loader"
      //   ]
      // },
      {
        test: /\*\.module\.(scss|sass)$/,
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
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
      }
    ]
  }
}