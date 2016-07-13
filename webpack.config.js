var path = require('path');
module.exports = {
    entry: {
      bouton: './lib/web-entry.js'
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
