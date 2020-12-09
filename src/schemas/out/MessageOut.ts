import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class MessageOut {
  constructor(text: string, createdAt: Date, updatedAt: Date) {
    this.text = text
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  @Field(() => String, { description: '메시지 내용물' })
  text!: string

  @Field(() => Date, { description: '생성 날짜' })
  createdAt!: Date

  @Field(() => Date, { description: '수정 날짜' })
  updatedAt!: Date
}
