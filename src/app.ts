import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync } from 'type-graphql'
import { BookResolver, NotiResolver } from '~/schemas/resolver'
import { createServer } from 'http'
import 'reflect-metadata'

(async () => {
  let app = express()

  const apollo = new ApolloServer({
    schema: buildSchemaSync({
      resolvers: [
        BookResolver,
        NotiResolver
      ]
    }),
    subscriptions: {
      path: '/sub',
    },
    playground: true,
    context: ({ req, res }) => ({ req, res })
  })
  //
  apollo.applyMiddleware({ app })

  const httpServer = createServer(app)
  apollo.installSubscriptionHandlers(httpServer)

  httpServer.listen(process.env.serverPort, () => {
    console.log(`server listen!!, port: ${process.env.serverPort}`)
  })
})()
