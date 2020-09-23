import { Connection, createConnection } from 'typeorm'
import { from } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import * as Model from '~/model'
import { flatMap } from 'rxjs/internal/operators'
import mysql from 'mysql2'

let dbClient: Connection

const init = () => {
  if (dbClient) {
    return Promise.resolve(dbClient)
  }
  return from(
    createConnection({
      type: 'mysql',
      charset: 'utf8mb4',
      url: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: 'qlalfqjsghekd',
      database: 'diary',
      host: 'localhost',
      dropSchema: true,
      synchronize: true,
      logging: true,
      entities: [Model.Book, Model.Diary, Model.User]
    })
  )
    .pipe(tap(con => (dbClient = con)))
    .toPromise()
}

// function call() {
//   from(
//     createConnection({
//       type: 'mysql',
//       charset: 'utf8mb4',
//       url: '127.0.0.1',
//       port: 3307,
//       username: 'root',
//       password: 'qlalfqjsghekd',
//       database: 'diary',
//       host: 'localhost',
//       dropSchema: true,
//       synchronize: true,
//       logging: true,
//       entities: [Model.Book, Model.Diary, Model.User]
//     })
//   )
//     .pipe(
//       map(con => con.getRepository(Book)),
//       flatMap(repo => {
//         let b = new Book(2, 42, 'dhaha')
//         return repo.save(b)
//       })
//     )
//     .subscribe(data => {
//       console.log('응답: ', data)
//     })
// }

export default init
