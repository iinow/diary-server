import { smart } from 'webpack-merge'
import webpack from 'webpack'
import path from 'path'
import ESLintPlugin from 'eslint-webpack-plugin'

const nodeExternals = require('webpack-node-externals')

const config: webpack.Configuration = smart({
  target: 'node',
  name: 'server',
  mode: 'none',
  entry: {
    app: path.resolve(__dirname, '../src/app.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '~': path.resolve(__dirname, '../src/'),
    },
  },
  devtool: 'inline-source-map',
  plugins: [new ESLintPlugin()],
})

type Server = {
  profiles: string
  port: number
}

type Redis = {
  host: string
  port: number
  password?: string
}

type MySql = {
  host: string
  username: string
  password: string
  port: number
  database: string
}

type TypeOrm = {
  dbType: 'mysql' | 'mariadb'
  dropSchema: boolean
}

type Influx = {
  host: string
  port: number
  database: string
}

type OAuthProvider = {
  clientId: string
  clientSecret: string
  callbackUrl: string
}

type OAuth = {
  provider: {
    kakao: OAuthProvider
    github: OAuthProvider
  }
  webRedirectUrl: string
}

export interface Env {
  server: Server
  redis: Redis
  mysql: MySql
  typeOrm: TypeOrm
  oauth: OAuth
  jwtSecret: string
  influx: Influx
}

export { config as baseConfig }
