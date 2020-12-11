import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync } from 'type-graphql'
import { createServer } from 'http'
import { Express } from 'express'
import Resolvers from '@/schemas/resolver'
import { pubSub } from '@/config'

export default (app: Express) => {
    const apollo = new ApolloServer({
        schema: buildSchemaSync({
          resolvers: ([...Resolvers] as unknown) as [Function, ...Function[]],
          pubSub,
        }),
        subscriptions: {
          path: '/sub',
        },
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    })
      
    apollo.applyMiddleware({ app })
    
    const httpServer = createServer(app)
    apollo.installSubscriptionHandlers(httpServer)
    return httpServer
}
