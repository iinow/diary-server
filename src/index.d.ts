declare namespace NodeJS {
  interface ProcessEnv {
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
}
