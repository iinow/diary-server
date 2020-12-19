import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql'
import { from, of } from 'rxjs'
import { Diary, User } from '@/model'
import { map } from 'rxjs/operators'
import { DiaryInput } from '@/schemas/input'
import { AuthUser } from '@/schemas/decorators'
import { flatMap } from 'rxjs/internal/operators'

@Resolver()
export class DiaryResolver {
  @Query(() => [Diary], { nullable: true })
  diaries(): Promise<Diary[]> {
    return from(Diary.find({ relations: ['user'] })).toPromise()
  }

  @Query(() => Diary, { nullable: true })
  diary(
    @Arg('id', { nullable: true }) diaryId: number,
    @Arg('yyyyMMdd', {
      nullable: true,
      description: '이 매개변수는 로그인이 되어 있어야지만 호출 가능',
    })
    yyyyMMdd: string,
    @AuthUser() user: User
  ): Promise<Diary | undefined> {
    if (diaryId !== undefined) {
      return from(
        Diary.findOne({ id: diaryId }, { relations: ['user'] })
      ).toPromise()
    }
    return of({})
      .pipe(
        flatMap(() =>
          Diary.getRepository()
            .createQueryBuilder('diary')
            .leftJoinAndSelect('diary.user', 'user')
            .where(`date_format(diary.created_at, '%Y%m%d') = (:yyyyMMdd)`, {
              yyyyMMdd,
            })
            .andWhere('user_uid = (:uid)', { uid: user.uid })
            .limit(1)
            .getRawAndEntities()
        ),
        map((data) =>
          data.entities.length !== 0 ? data.entities[0] : undefined
        )
      )
      .toPromise()
  }

  @Authorized()
  @Mutation(() => Date)
  insertAndUpdateDiary(
    @Arg('diary') diaryInput: DiaryInput,
    @AuthUser() user: User
  ): Promise<Date> {
    return of(diaryInput)
      .pipe(
        flatMap((diary: DiaryInput) => {
          if (diary.id === undefined) {
            return Promise.resolve(Diary.create())
          }
          return Diary.findOne({ id: diaryInput.id, user })
        }),
        map((diary) => {
          let newDiary = diary
          if (newDiary === undefined || newDiary.id === undefined) {
            newDiary = Diary.create()
            newDiary.user = user
            newDiary.createdAt = diaryInput.toDate()
          }
          newDiary.content = diaryInput.content
          return newDiary
        }),
        flatMap((diary) => diary.save()),
        map((diary) => diary.updatedAt)
      )
      .toPromise()
  }
}
