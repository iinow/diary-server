declare namespace NodeJS {
  interface ProcessEnv {
    serverPort: number
    redisHost: string
    redisPort: number
    mysqlHost: string
    mysqlUsername: string
    mysqlPassword: string
    mysqlPort: number
    mysqlDatabase: string
  }
}
