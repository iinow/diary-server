import session from 'express-session'
import cookieParser from 'cookie-parser'
import tokenMiddleware from '@/middleware/token'
import kakaoPassportInitialize from '@/middleware/passport'
import initializeApollo from '@/middleware/apollo'
import { Express } from 'express'

function init(app: Express) {
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
  app.use(/\/(?!graphql)*/, tokenMiddleware)
  const httpServer = initializeApollo(app)
  return httpServer
}

export default init
