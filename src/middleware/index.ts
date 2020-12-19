import session from 'express-session'
import cookieParser from 'cookie-parser'
import tokenMiddleware from '@/middleware/token'
import kakaoPassportInitialize from '@/middleware/passport'
import initializeApollo from '@/middleware/apollo'
import { Express } from 'express'
import connectRedis from 'connect-redis'
import redisClient from '@/config/redis'

const RedisStore = connectRedis(session)

function init(app: Express) {
  app.use(cookieParser())
  app.use(
    session({
      secret: 'hahaha',
      cookie: { maxAge: 60 * 60 * 1000 },
      resave: true,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
      }),
    })
  )
  kakaoPassportInitialize(app)
  app.use(/\/(?!graphql)*/, tokenMiddleware)
  const httpServer = initializeApollo(app)
  return httpServer
}

export default init
