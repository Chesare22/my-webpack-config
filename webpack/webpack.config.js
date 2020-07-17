require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const route = extraConfig => {
  const configuration = Object.assign({
    title: process.env.APP_TITLE,
    minify: {
      html5: true,
      collapseWhitespace: true,
      caseSensitive: true,
      removeComments: true,
      removeEmptyElements: true,
    },
  }, extraConfig);
  return new HtmlWebpackPlugin(configuration);
};

module.exports = {
  entry: {
    index: './src/views/index.js',
    about: './src/views/about.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    route({
      template: './src/views/index.handlebars',
      chunks: ['index'],
      filename: 'index.html',
    }),
    route({
      template: './src/views/about.handlebars',
      chunks: ['about'],
      filename: 'about/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-min.css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(handlebars|hbs|html)$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions'],
              },
              plugins: () => [autoprefixer],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader'],
      },
    ],
  },
};