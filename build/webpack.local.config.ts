import { smart } from 'webpack-merge'
import webpack from 'webpack'
import { Env, baseConfig } from './webpack.base.config'

const NodemonPlugin = require('nodemon-webpack-plugin')

const env: Env = {
  serverPort: 7711,
  redisHost: 'localhost',
  redisPort: 6379,
  dbType: 'mysql',
  mysqlDatabase: 'diary',
  mysqlHost: 'localhost',
  mysqlPassword: 'qlalfqjsghekd',
  mysqlPort: 3307,
  mysqlUsername: 'root',
  dropSchema: true,
  oauthKakaoClientId: '2d757aa5c6d0840f1d941423b5fe0ff1',
  oauthKakaoClientSecret: '5CWqDOhlz3wnJd17RR1rwYLMfGMamhUh',
  oauthKakaoCallbackUrl: 'http://localhost:7711/oauth/kakao/callback',
}

const config = smart({
  mode: 'development',
  plugins: [new webpack.EnvironmentPlugin(env), new NodemonPlugin({})],
  devtool: 'source-map',
  watch: false,
})

module.exports = smart(baseConfig, config)
