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
      type: process.env.typeOrm.dbType,
      charset: 'utf8mb4',
      port: process.env.mysql.port,
      username: process.env.mysql.username,
      password: process.env.mysql.password,
      database: process.env.mysql.database,
      host: process.env.mysql.host,
      dropSchema: process.env.typeOrm.dropSchema,
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
