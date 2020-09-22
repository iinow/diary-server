import { Env, baseConfig } from './webpack.base.config'
import { smart } from 'webpack-merge'
import webpack from 'webpack'
const NodemonPlugin = require('nodemon-webpack-plugin')

const config = smart({
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({
      APP_NAME: 'local...'
    })
  ]
})

module.exports = smart(baseConfig, config)
