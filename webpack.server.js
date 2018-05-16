const path = require('path');

module.exports = {
 // webpack we're building for server

 target: 'node',

 // tell webpack root file of server

 entry: './server/index.js',

 //tell webpack output file

 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'build')
 },

 //tell webpack to run babel on every file

 module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] }}]
          ]
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] }}]
          ]
        }
      }
    ]
 }
}