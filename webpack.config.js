// Please note that here writen ES5 code

/* Internals */
var path = require("path")

/* Externals */
var webpack = require("webpack");

/* Webpack plugins */
var CleanWebpackPlugin = require("clean-webpack-plugin");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/* Locals */
var pkg = require("./package.json")

// Set building environment
var __DEV__ = (process.env.NODE_ENV !== 'production');

// Variables
var buildDate = require('moment')().format("DDMMYYYY");
var distPath = path.resolve(__dirname, 'dist');

// Unified style exposition technique
var ExtractStyles = new ExtractTextPlugin('css/app-' + buildDate + '-[contenthash].css');

var config = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    polyfill: 'babel-polyfill',
    vendor: Object.keys(pkg.dependencies),
    app: './entry.tsx',
  },

  output: {
    filename: 'js/[name]-' + buildDate + '-[hash].bundle.js',
    chunkFilename: 'js/parts/[name]-' + buildDate + '-[chunkhash].chunk.js',
    path: distPath,
    publicPath: ''
  },

  devtool: __DEV__ ? 'inline-source-map' : false,

  devServer: {
    hot: true,
    host: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    contentBase: distPath,
    publicPath: '',
    proxy: {
      '/api': {
        target: 'http://localhost:8081'
      }
    },
  },

  module: {
    rules: [
      // Typescript preprocessing
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-typescript-loader",
          options: {configFileName: "webpack.tsconfig.json"}
        }
      },
      // Babel ES6+ preprocessing
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Common CSS
      {
        test: /\.css$/,
        use: ExtractStyles.extract({
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              minimize: !__DEV__
            }
          },
          fallback: 'style-loader'
        }),
      },
      // External Less/CSS preprocessing
      {
        test: /\.less$/,
        exclude: [/components/, /containers/],
        use: ExtractStyles.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              minimize: !__DEV__
            }
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      },
      // Internal Less/CSS preprocessing using css-modules
      {
        test: /\.less$/,
        include: [/components/, /containers/],
        use: ExtractStyles.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: __DEV__,
              minimize: !__DEV__
            }
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      },
      // Common files preprocessing
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },

      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ["src", "node_modules"]
  },

  plugins: [

    // Autocompilation for index.html
    new HtmlWebpackPlugin({
      template: 'assets/templates/index.html',
      filename: 'index.html',
      minify: __DEV__ ? false : {
        html5: true,
        collapseWhitespace: true
      }
    }),

    // Expose global info
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(pkg.version),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),

    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      dry: false,
      exclude: ['favicon.ico']
    }),

    ExtractStyles
  ]
}

if (__DEV__) {
  // DEVELOPMENT BUILD 

  // Include development code that supports hot reloading
  config.entry.vendor.unshift(
    'webpack-dev-server/client?/',
    'webpack/hot/only-dev-server'
  );

  config.plugins.unshift(new webpack.NamedModulesPlugin());
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

} else {
  // PRODUCTION BUILD

  // Minify code over the production build
  config.plugins.push(new UglifyJSPlugin({ comments: false }));
}

module.exports = config;
