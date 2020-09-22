import { Env, baseConfig } from './webpack.base.config'
import { smart } from 'webpack-merge'
import webpack from 'webpack'
const NodemonPlugin = require('nodemon-webpack-plugin')

const env: Env = {
  serverPort: 7711
}

const config = smart({
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin(env),
    new NodemonPlugin({})
  ],
  devtool: 'source-map',
  watch: true
})

module.exports = smart(baseConfig, config)
