import { from, of, throwError } from 'rxjs'
import { map } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'
import { Diary, User } from '@/model'
import { UnAuthorizeError } from '@/error'
import { DiaryInput, PaginationInput } from '@/schemas/input'
import { InsertAndUpdateDiaryOut, PaginatedDiaryResponse } from '@/schemas/out'

export function findOneDiaryById(id: number) {
  return from(Diary.findOne({ id }, { relations: ['user'] })).toPromise()
}

export function findOneDiaryByUserAndCreatedAt(
  user: User,
  yyyyMMddHHmm: string
) {
  return of({})
    .pipe(
      flatMap(() =>
        user === undefined
          ? throwError(new UnAuthorizeError())
          : Diary.getRepository()
              .createQueryBuilder('diary')
              .leftJoinAndSelect('diary.user', 'user')
              .where(
                `date_format(diary.created_at, '%Y%m%d%H%i') >= (:yyyyMMddHHmm)`,
                {
                  yyyyMMddHHmm,
                }
              )
              .andWhere('user_uid = (:uid)', { uid: user.uid })
              .limit(1)
              .getRawAndEntities()
      ),
      map((data) => (data.entities.length !== 0 ? data.entities[0] : undefined))
    )
    .toPromise()
}

export function insertAndUpdate(user: User, diaryInput: DiaryInput) {
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
        }
        newDiary.title = diaryInput.title
        newDiary.content = diaryInput.content
        return newDiary
      }),
      flatMap((diary) => diary.save()),
      map((diary) => new InsertAndUpdateDiaryOut(diary))
    )
    .toPromise()
}

export function findDiaryByUserOrderCreatedDesc(
  user: User,
  pagination: PaginationInput
): Promise<PaginatedDiaryResponse> {
  return from(
    Diary.findAndCount({
      where: {
        user,
      },
      order: {
        createdAt: 'DESC',
      },
      take: pagination.pageItemCount,
      skip: (pagination.page - 1) * pagination.pageItemCount,
    })
  )
    .pipe(
      map((res) => {
        const [items, total] = res
        const hasMore: boolean =
          pagination.page * pagination.pageItemCount < total
        return { items, total, hasMore, ...pagination }
      })
    )
    .toPromise()
}

export default {
  findOneDiaryById,
  findOneDiaryByUserAndCreatedAt,
  insertAndUpdate,
  findDiaryByUserOrderCreatedDesc,
}
