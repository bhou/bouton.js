var path = require('path');
const TerserPlugin = require("terser-webpack-plugin")
const PROD = (process.env.NODE_ENV === "production");
module.exports = {
    mode: PROD ? 'production' : 'development',
    entry: {
      bouton: './lib/web-entry.js'
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-flow',
                ],
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: PROD,
      minimizer: [
        new TerserPlugin()
      ],
    },
};
