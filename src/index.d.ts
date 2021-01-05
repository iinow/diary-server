declare namespace NodeJS {
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
    oauth: OAuth
    jwtSecret: string
    influx: Influx
  }
}
