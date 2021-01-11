import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync } from 'type-graphql'
import { createServer } from 'http'
import { Express } from 'express'
import Resolvers from '@/schemas/resolver'
import { log, pubSub } from '@/config'
import authChecker from '@/schemas/auth'

export default (app: Express) => {
  const apollo = new ApolloServer({
    schema: buildSchemaSync({
      resolvers: ([...Resolvers] as unknown) as [Function, ...Function[]],
      pubSub,
      authChecker,
    }),
    subscriptions: {
      path: '/sub',
    },
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    debug: false,
    context: ({ req, res }) => ({ req, res }),
    formatError: (err) => {
      log.error({ error: err.originalError }, '에러발생...')
      return err
    },
  })

  apollo.applyMiddleware({ app })

  const httpServer = createServer(app)
  apollo.installSubscriptionHandlers(httpServer)
  return httpServer
}
