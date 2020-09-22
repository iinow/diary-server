import { ObjectType, Field, Int} from 'type-graphql'

@ObjectType({ description: '책 타입 정의' })
export class Book {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  authorId!: number

  @Field()
  name!: string

  @Field(() => Date)
  createAt!: Date
}
