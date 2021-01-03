import { Connection, createConnection } from 'typeorm'
import { from } from 'rxjs'
import { tap } from 'rxjs/operators'
import { TypeOrmLoggerAdapter } from '@/config/bunyan/TypeOrmLoggerAdapter'
import Entities from '@/model'
import { log } from '@/config'

let dbClient: Connection

const init = () => {
  if (dbClient) {
    return Promise.resolve(dbClient)
  }
  return from(
    createConnection({
      type: process.env.dbType,
      charset: 'utf8mb4',
      port: process.env.mysqlPort,
      username: process.env.mysqlUsername,
      password: process.env.mysqlPassword,
      database: process.env.mysqlDatabase,
      host: process.env.mysqlHost,
      dropSchema: process.env.dropSchema,
      timezone: 'Z',
      synchronize: true,
      logging: true,
      logger: new TypeOrmLoggerAdapter(log),
      entities: [...Entities],
    })
  )
    .pipe(tap((con) => (dbClient = con)))
    .toPromise()
}

export default init
