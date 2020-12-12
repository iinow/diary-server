import { smart } from 'webpack-merge'
import webpack from 'webpack'
import { Env, baseConfig } from './webpack.base.config'

const env: Env = {
  serverPort: 7711,
  redisHost: 'localhost',
  redisPort: 6379,
  dbType: 'mariadb',
  mysqlDatabase: 'diary',
  mysqlHost: 'localhost',
  mysqlPassword: 'qweqweqwe2!',
  mysqlPort: 3306,
  mysqlUsername: 'root',
  dropSchema: false,
  oauthKakaoClientId: '2d757aa5c6d0840f1d941423b5fe0ff1',
  oauthKakaoClientSecret: '5CWqDOhlz3wnJd17RR1rwYLMfGMamhUh',
  oauthKakaoCallbackUrl: 'http://localhost:7711/oauth/kakao/callback',
}

const config = smart({
  mode: 'development',
  plugins: [new webpack.EnvironmentPlugin(env)],
})

module.exports = smart(baseConfig, config)
