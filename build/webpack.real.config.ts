import { smart } from 'webpack-merge'
import webpack from 'webpack'
import { Env, baseConfig } from './webpack.base.config'

const NodemonPlugin = require('nodemon-webpack-plugin')

const config = smart({
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      APP_NAME: 'local...',
    }),
  ],
})

module.exports = smart(baseConfig, config)
