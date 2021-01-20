import { from, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'
import { Journal, User } from '@/model'

export function findJournalByUser(user: User): Promise<Journal[]> {
  return from(Journal.find({ where: { user } }))
    .pipe(
      flatMap((res) => {
        if (res.length === 0) {
          return from(Journal.createEntity(user).save())
            .pipe(map((journal) => [journal]))
            .toPromise()
        }
        return of(res)
      })
    )
    .toPromise()
}

export default {
  findJournalByUser,
}
