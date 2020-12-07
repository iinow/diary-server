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

export interface Env {
  serverPort: number
  redisHost: string
  redisPort: number
  dbType: 'mysql' | 'mariadb'
  mysqlHost: string
  mysqlUsername: string
  mysqlPassword: string
  mysqlPort: number
  mysqlDatabase: string
  dropSchema: boolean
}

export { config as baseConfig }
