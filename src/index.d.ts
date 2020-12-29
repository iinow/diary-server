declare namespace NodeJS {
  type Influx = {
    host: string
    port: number
    database: string
  }

  interface ProcessEnv {
    profiles: 'local' | 'dev'
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
    oauthKakaoClientId: string
    oauthKakaoClientSecret: string
    oauthKakaoCallbackUrl: string
    jwtSecret: string
    influx: Influx
  }
}
