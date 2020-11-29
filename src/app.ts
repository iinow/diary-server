import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync } from 'type-graphql'
import * as Resolvers from '@/schemas/resolver'
import { createServer } from 'http'
import 'reflect-metadata'
import init from '@/config/db'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import * as Model from '@/model'
import { flatMap } from 'rxjs/internal/operators'
;(async () => {
  const app = express()

  const apollo = new ApolloServer({
    schema: buildSchemaSync({
      resolvers: [Resolvers.DiaryResolver],
    }),
    subscriptions: {
      path: '/sub',
    },
    playground: true,
    context: ({ req, res }) => ({ req, res }),
  })
  //
  apollo.applyMiddleware({ app })

  const httpServer = createServer(app)
  apollo.installSubscriptionHandlers(httpServer)

  httpServer.listen(process.env.serverPort, () => {
    console.log(`server listen!!, port: ${process.env.serverPort}`)
    test()
  })
})()

async function test() {
  const user = await from(init())
    .pipe(
      map((con) => con.getRepository(Model.User)),
      flatMap((repo) => {
        const user = new Model.User()
        user.userId = 'ha'
        return repo.save(user)
      })
    )
    .toPromise()

  const diary = await from(init())
    .pipe(
      map((con) => con.getRepository(Model.Diary)),
      flatMap((repo) => {
        const diary = new Model.Diary()
        diary.user = user
        diary.content = '내용 테스트로 넣는드아'
        return repo.save(diary)
      })
    )
    .toPromise()

  const diaries = await from(init())
    .pipe(
      map((con) => con.getRepository(Model.Diary)),
      flatMap((repo) => repo.find({ relations: ['user'] }))
    )
    .toPromise()
  console.log('d', diaries[0].user)
}
