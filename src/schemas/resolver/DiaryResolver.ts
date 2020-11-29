import { Resolver, Query } from 'type-graphql'
import { from } from 'rxjs'
import { Diary } from '@/model'

@Resolver()
export class DiaryResolver {
  @Query(() => [Diary])
  diaries(): Promise<Diary[]> {
    return from(Diary.find({ relations: ['user'] })).toPromise()
  }
}
