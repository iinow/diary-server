import express from 'express'
import 'reflect-metadata'
import initializeApollo from '@/middleware/apollo'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import tokenMiddleware from '@/middleware/token'
import kakaoPassportInitialize from '@/middleware/passport'

const app = express()

async function bootstrap() {
  app.use(cookieParser())
  app.use(
    session({
      secret: 'hahaha',
      cookie: { maxAge: 60 * 60 * 1000 },
      resave: true,
      saveUninitialized: false,
    })
  )
  kakaoPassportInitialize(app)
  app.use(tokenMiddleware)
  const httpServer = initializeApollo(app)

  httpServer.listen(process.env.serverPort, () => {
    console.log(`server listen!!!, port: ${process.env.serverPort}`)
  })
}

bootstrap()

export default app
