import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql'
import { Diary, User } from '@/model'
import { DiaryInput, PaginationInput } from '@/schemas/input'
import { AuthUser } from '@/schemas/decorators'
import { InsertAndUpdateDiaryOut, PaginatedDiaryResponse } from '@/schemas/out'
import {
  findOneDiaryById,
  findOneDiaryByUserAndCreatedAt,
  insertAndUpdate,
  findDiaryByUserOrderCreatedDesc,
} from '@/service/DiaryService'

@Resolver()
export class DiaryResolver {
  @Authorized()
  @Query(() => PaginatedDiaryResponse, { nullable: true })
  diaries(
    @Arg('page') pagination: PaginationInput,
    @Arg('journalId', { description: 'journal 엔티티 ID' }) journalId: number,
    @AuthUser() user: User
  ): Promise<PaginatedDiaryResponse> {
    return findDiaryByUserOrderCreatedDesc(user, pagination, journalId)
  }

  @Authorized()
  @Query(() => Diary, { nullable: true, description: '오늘 일기 가져오기' })
  diary(
    @Arg('yyyyMMddHHmm', {
      nullable: true,
      description: '이 매개변수는 로그인이 되어 있어야지만 호출 가능',
    })
    yyyyMMddHHmm: string,
    @AuthUser() user: User
  ): Promise<Diary | undefined> {
    return findOneDiaryByUserAndCreatedAt(user, yyyyMMddHHmm)
  }

  @Query(() => Diary, { nullable: true, description: '일기 아이디로 검색' })
  diaryById(
    @Arg('id', { nullable: true }) diaryId: number
  ): Promise<Diary | undefined> {
    return findOneDiaryById(diaryId)
  }

  @Authorized()
  @Mutation(() => InsertAndUpdateDiaryOut)
  insertAndUpdateDiary(
    @Arg('diary') diaryInput: DiaryInput,
    @AuthUser() user: User
  ): Promise<InsertAndUpdateDiaryOut> {
    return insertAndUpdate(user, diaryInput)
  }
}
