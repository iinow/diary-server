import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  Subscription
} from 'type-graphql'
import { Diary } from '~/model'
import { from, of } from 'rxjs'
import { delay, map, tap } from 'rxjs/operators'
import init from '../../config/db'
import { flatMap } from 'rxjs/internal/operators'
import { DiaryRepository } from '~/repository'

@Resolver()
export class DiaryResolver {
  @Query(() => [Diary])
  diaries(): Promise<Diary[]> {
    return from(init())
      .pipe(
        map(con => con.getCustomRepository(DiaryRepository)),
        flatMap(repo => repo.find({ relations: ['user'] }))
      )
      .toPromise()
  }
}
