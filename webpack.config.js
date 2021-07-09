const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: {
    main: './index.js',
    chunk: './chunk.js',
    aboutUs: './aboutUs.js'
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
    }),
    new HTMLWebpackPlugin({
      filename: 'aboutUs.html',
      template: './aboutUs/aboutUs.html',
      inject: true
    }),
    new HTMLWebpackPlugin({
      filename: 'pricing.html',
      template: './pricing/pricing.html',
      inject: true
    }),
    new HTMLWebpackPlugin({
      filename: 'contactUs.html',
      template: './contactUs/contactUs.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css'
    })
  ],
  devServer: {
    port: 4201,
    contentBase: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'aboutUs'),
      path.join(__dirname, 'pricing'),
      path.join(__dirname, 'contactUs'),
    ]
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}