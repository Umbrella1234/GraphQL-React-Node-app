const path = require('path');

const rootDir = path.join(__dirname, '../', '../');
const srcDir = path.join(rootDir, 'user_app', 'src');
const staticDir = path.join(rootDir, 'api', 'static');

module.exports = {
  entry: ['babel-polyfill', path.join(srcDir, 'index.js')],
  output: {
    path: staticDir,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ],
  },
};
