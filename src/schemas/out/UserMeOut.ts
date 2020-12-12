import { User } from '@/model'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserMeOut {
  constructor(user: User) {
    this.name = user.userName
  }

  @Field(() => String, { description: '이름' })
  name!: string

  @Field(() => Date, { description: '생성 날짜' })
  createdAt!: Date
}
