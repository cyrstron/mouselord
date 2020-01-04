const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {  
  const isDevelopment = argv.mode === 'development';

  const cssLoaders = [{
      loader: MiniCssExtractPlugin.loader, 
    }, { 
      loader: 'css-loader', 
      options: {
        modules: true,    
        localIdentName: '[name]__[local]___[hash:base64:5]',
        sourceMap: true
      } 
    }
  ];

  const outputPath = isDevelopment ? 
    path.join(__dirname, '/.dist') : 
    path.join(__dirname, '../static/client');

  const filename = isDevelopment ?
    'bundle.min.js' :
    'bundle.[hash].min.js';

  const publicPath = isDevelopment ?
    '/' :
    '/static/client/';

  return {
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      filename,
      publicPath,
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
      extensions: ['.ts', '.tsx', '.js', '.css', '.js.map'],    
      symlinks: false,
      alias: {
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),      
      }
    },
    module: {
      rules: [
        { 
          test: /\.tsx?$/, 
          loader: 'ts-loader',
        },      
        {
          test: /\.css$/,
          use: cssLoaders,
        },
        {
          test: /\.scss$/,
          use: [
            ...cssLoaders,
            { loader: 'sass-loader', options: { sourceMap: isDevelopment } }
          ],
        },
        isDevelopment && {
          test: /\.js\.map$/,
          use: "source-map-loader",
          enforce: "pre",
          include: path.join(__dirname, '/node_modules/@micelord')
        }
      ].filter((rule) => !!rule)
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({      
        filename: isDevelopment ? "style.css" : "style.[hash].css",
        chunkFilename: isDevelopment ? "[name].css" : "[name].[hash].css",
      }),    
      new Dotenv({
        path: './.env',
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          secure: false
        },
        '/auth': {
          target: 'http://localhost:3001',
          secure: false
        },
        '/static': {
          target: 'http://localhost:3001',
          secure: false
        }
      }
    },
    devtool: isDevelopment ? 'eval-source-map' : undefined,
  }
}