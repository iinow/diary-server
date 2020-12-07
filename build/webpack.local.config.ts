import { smart } from 'webpack-merge'
import webpack from 'webpack'
import { Env, baseConfig } from './webpack.base.config'
const NodemonPlugin = require('nodemon-webpack-plugin')

const env: Env = {
  serverPort: 7711,
  redisHost: 'localhost',
  redisPort: 6379,
}

const config = smart({
  mode: 'development',
  plugins: [new webpack.EnvironmentPlugin(env), new NodemonPlugin({})],
  devtool: 'source-map',
  watch: false,
})

module.exports = smart(baseConfig, config)
