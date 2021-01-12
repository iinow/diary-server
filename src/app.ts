import express from 'express'
import 'reflect-metadata'
import initializeMiddleware from '@/middleware'
import { log } from '@/config'

const app = express()

async function bootstrap() {
  const httpServer = initializeMiddleware(app)

  httpServer.listen(process.env.server.port, () => {
    log.debug(`server listen!!!, port: ${process.env.server.port}`)
  })
}

bootstrap()

export default app
