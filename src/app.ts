import express from 'express'
import 'reflect-metadata'
import initializeApollo from '@/middleware/apollo'

const app = express()

async function bootstrap() {
  const httpServer = initializeApollo(app)

  httpServer.listen(process.env.serverPort, () => {
    console.log(`server listen!!!, port: ${process.env.serverPort}`)
  })
}

bootstrap()

export default app

require('@/middleware')
