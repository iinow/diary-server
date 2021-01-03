import { Provider } from '@/common/constants'
import { User } from '@/model'
import { Directive, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserMeOut {
  constructor(user: User) {
    this.uuid = user.uid
    this.name = user.userName
    this.provider = user.provider
    this.createdAt = new Date(user.createAt)
  }

  @Field(() => String, { description: '사용자 uuid' })
  uuid!: string

  @Field(() => String, { description: '이름' })
  name!: string

  @Directive('@lowercase')
  @Field(() => Provider, { description: 'Social login provider' })
  provider!: Provider

  @Field(() => Date, { description: '생성 날짜' })
  createdAt!: Date
}
