declare namespace NodeJS {
  interface ProcessEnv {
    serverPort: number
    redisHost: string
    redisPort: number
  }
}
