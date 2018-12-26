const path = require("path");
var _ = require("lodash");
var minimist = require("minimist");
var chalk = require("chalk");

const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const moduleObj = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.(scss|css)$/,
      use: [
        // "style-loader",
        // MiniCssExtractPlugin.loader,
        // "css-loader",
        // "sass-loader"
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader", // translates CSS into CommonJS
          options: {
            sourceMap: true,
            modules: true,
            //localIdentName: "[name]__[local]___[hash:base64:5]"
            localIdentName: "[local]"
          }
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
          options: { sourceMap: true }
        }
      ]
    }
  ]
};

var DEFAULT_TARGET = "BUILD";

var DEFAULT_PARAMS = {
  resolve: {
    extensions: [".js"]
  },
  entry: {
    client: "./src/client/index.js"
  },
  target: "web",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/public")
    //sourceMapFilename: "[name].[chunkhash].map"
  },
  // externals: {
  //     'auth0-lock': 'Auth0Lock'
  // },
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/client/index.html"
    }),
    new Dotenv()
  ]
};

var PARAMS_PER_TARGET = {
  DEV: {
    devtool: "source-map",
    output: {
      filename: "[name].js"
    },
    mode: "development"
  },

  DEV_APACHE: {
    devtool: "source-map",
    output: {
      filename: "[name].js",
      path: "var/www/html/react-redux-boilerplate/public"
    },
    mode: "development"
  },

  DEV_SERVER: {
    devtool: "inline-source-map",
    output: {
      filename: "[name].js"
    },
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "dist/public"),
      port: 9000
    }
  },

  BUILD: {
    output: {
      path: "./build"
    },
    devtool: "source-map",
    plugins: [new CleanWebpackPlugin(["build"])],
    mode: "production"
  }

  // TODO: Maybe somethin for lager
  // DIST: {
  //     debug: false,
  //     output: {
  //         path: './dist'
  //     },
  //     plugins: [
  //         new CleanWebpackPlugin(['dist']),
  //         new webpack.optimize.UglifyJsPlugin({
  //             mangle: false
  //         })
  //     ],
  //     mode: production
  // }
};

var target = _resolveBuildTarget(DEFAULT_TARGET);
var params = _.merge(
  DEFAULT_PARAMS,
  PARAMS_PER_TARGET[target],
  _mergeArraysCustomizer
);

_printBuildInfo(target, params);
console.log(params);
module.exports = params;

function _resolveBuildTarget(defaultTarget) {
  var target = minimist(process.argv.slice(2)).TARGET;
  if (!target) {
    console.log("No build target provided, using default target instead\n\n");
    target = defaultTarget;
  }
  return target;
}

function _printBuildInfo(target, params) {
  console.log("\nStarting " + chalk.bold.green('"' + target + '"') + " build");
  if (target === "DEV_SERVER") {
    console.log(
      "Dev server: " +
        chalk.bold.yellow("http://localhost:" + params.devServer.port) +
        "\n\n"
    );
  } else {
    console.log("\n\n");
  }
}

function _mergeArraysCustomizer(a, b) {
  if (_.isArray(a)) {
    return a.concat(b);
  }
}
/*
const client = {
  entry: {
    client: "./src/client/index.js"
  },
  target: "web",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/public")
  },
  devtool: "source-map",
  mode: "development",
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/client/index.html"
    })
  ]
};
*/
// const server = {
//   entry: {
//     server: "./src/server/index.js"
//   },
//   target: "node",
//   mode: "development",
//   output: {
//     filename: "[name].js",
//     path: path.resolve(__dirname, "dist")
//   },
//   //module: moduleObj,
//   externals: [nodeExternals()]
// };
// module.exports = [client, server];
/*
module.exports = client;
*/
