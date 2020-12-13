import express from 'express'
import 'reflect-metadata'
import initializeMiddleware from '@/middleware'

const app = express()

async function bootstrap() {
  const httpServer = initializeMiddleware(app)

  httpServer.listen(process.env.serverPort, () => {
    console.log(`server listen!!!, port: ${process.env.serverPort}`)
  })
}

bootstrap()

export default app
