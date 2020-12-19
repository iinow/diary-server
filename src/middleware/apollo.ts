import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync } from 'type-graphql'
import { createServer } from 'http'
import { Express } from 'express'
import Resolvers from '@/schemas/resolver'
import { pubSub } from '@/config'
import { authChecker } from '@/schemas/auth/AuthChecker'

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
      console.log('에러 발생!', err.originalError)
      return err
    },
  })

  apollo.applyMiddleware({ app })

  const httpServer = createServer(app)
  apollo.installSubscriptionHandlers(httpServer)
  return httpServer
}
