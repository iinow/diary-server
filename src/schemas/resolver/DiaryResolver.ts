import { Resolver, Query } from 'type-graphql'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'
import init from '@/config/db'
import { Diary } from '@/model'
import { DiaryRepository } from '@/repository'

@Resolver()
export class DiaryResolver {
  @Query(() => [Diary])
  diaries(): Promise<Diary[]> {
    return from(init())
      .pipe(
        map((con) => con.getCustomRepository(DiaryRepository)),
        flatMap((repo) => repo.find({ relations: ['user'] }))
      )
      .toPromise()
  }
}
