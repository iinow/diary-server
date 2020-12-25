import { Diary } from '@/model'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class InsertAndUpdateDiaryOut {
  constructor(diary: Diary) {
    this.id = diary.id
    this.updatedAt = diary.updatedAt
  }

  @Field(() => Number, { description: '일기 ID 값' })
  id!: number

  @Field(() => Date, { description: '수정 날짜' })
  updatedAt!: Date
}
