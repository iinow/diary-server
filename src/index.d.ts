declare namespace NodeJS {
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

  interface ProcessEnv {
    server: Server
    redis: Redis
    mysql: MySql
    typeOrm: TypeOrm
    oauth: OAuth
    jwtSecret: string
    influx: Influx
  }
}
