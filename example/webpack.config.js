const webpack = require('webpack');

module.exports = {

  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],

  "resolve": {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};
