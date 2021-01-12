import { smart } from 'webpack-merge'
import webpack from 'webpack'
import { Env, baseConfig } from './webpack.base.config'

const env: Env = {
  server: {
    profiles: 'dev',
    port: 7711,
  },
  redis: {
    host: '192.168.0.24',
    port: 6379,
  },
  typeOrm: {
    dbType: 'mysql',
    dropSchema: false,
  },
  mysql: {
    host: '192.168.0.24',
    port: 3306,
    username: 'root',
    password: 'qlalfqjsghekd',
    database: 'diary',
  },
  oauth: {
    provider: {
      kakao: {
        clientId: '2d757aa5c6d0840f1d941423b5fe0ff1',
        clientSecret: '5CWqDOhlz3wnJd17RR1rwYLMfGMamhUh',
        callbackUrl: 'http://iinow.synology.me:7711/oauth/kakao/callback',
      },
      github: {
        clientId: '46d7f30dfe4e000b5f83',
        clientSecret: '6134dd8bfb91525e286f54be24ad1166aedad5a8',
        callbackUrl: 'http://iinow.synology.me:7711/oauth/github/callback',
      },
    },
    webRedirectUrl: 'http://localhost:3000',
  },
  jwtSecret: 'HAHAHA',
  influx: {
    host: '192.168.0.24',
    port: 8101,
    database: 'ha',
  },
}

const config = smart({
  mode: 'development',
  plugins: [new webpack.EnvironmentPlugin(env)],
})

module.exports = smart(baseConfig, config)
