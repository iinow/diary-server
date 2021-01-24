import { from, of, throwError } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'
import { Diary, Journal, User } from '@/model'
import { unAuthorizeError } from '@/error'
import { DiaryInput, PaginationInput } from '@/schemas/input'
import { InsertAndUpdateDiaryOut, PaginatedDiaryResponse } from '@/schemas/out'

export function findOneDiaryById(id: number) {
  return from(Diary.findOne({ id })).toPromise()
}

export function findOneDiaryByUserAndCreatedAt(
  user: User,
  yyyyMMddHHmm: string,
  journalId: number
) {
  return of({})
    .pipe(
      flatMap(() =>
        user === undefined
          ? throwError(unAuthorizeError)
          : Diary.getRepository()
              .createQueryBuilder('diary')
              .leftJoinAndSelect('diary.journal', 'journal')
              .where(
                `date_format(diary.created_at, '%Y%m%d%H%i') >= (:yyyyMMddHHmm)`,
                {
                  yyyyMMddHHmm,
                }
              )
              .andWhere('journal_id = (:journalId)', { journalId })
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
      flatMap(() => {
        return Journal.findOne({
          where: {
            id: diaryInput.journalId,
          },
        })
      }),
      flatMap((journal) => {
        if (!journal) {
          return throwError(unAuthorizeError)
        }
        if (!diaryInput.id) {
          return Promise.resolve(Diary.createEntity(journal))
        }
        return Diary.findOne({
          where: {
            id: diaryInput.id,
            journal,
          },
        })
      }),
      flatMap((diary) => {
        if (!diary) {
          return throwError(unAuthorizeError).toPromise()
        }
        diary.updateDiaryInput(diaryInput)
        return of(diary)
      }),
      flatMap((diary) => diary.save()),
      map((diary) => new InsertAndUpdateDiaryOut(diary))
    )
    .toPromise()
}

export function findDiaryByUserOrderCreatedDesc(
  user: User,
  pagination: PaginationInput,
  journalId: number
): Promise<PaginatedDiaryResponse> {
  return from(
    Journal.findOne({
      where: {
        id: journalId,
        user,
      },
    })
  )
    .pipe(
      filter((journal) => journal !== undefined),
      flatMap((journal) =>
        Diary.findAndCount({
          where: {
            journal,
          },
          order: {
            createdAt: 'DESC',
          },
          take: pagination.cntPageItem,
          skip: (pagination.page - 1) * pagination.cntPageItem,
        })
      ),
      map((res) => {
        const [items, total] = res
        const hasMore: boolean =
          pagination.page * pagination.cntPageItem < total
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
