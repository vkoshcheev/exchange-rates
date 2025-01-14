const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracting CSS in production

module.exports = {
  entry: './src/index.tsx', // entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // output folder
    clean: true,                           // clean old files on each build
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // TS loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/, // sass loader
        use: [
          process.env.NODE_ENV === 'production' 
            ? MiniCssExtractPlugin.loader // extract CSS in production
            : 'style-loader',             // inject CSS in development
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    // only include in production build
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({ filename: 'styles.css' })] : []),
  ],
  devServer: {
    static: './dist', // serve files from dist
    port: 3000,
    hot: true,        // hot reload
  },
  mode: process.env.NODE_ENV || 'development', // use environment-based mode
  devtool: 'source-map',                       // enable source maps for easier debugging
};