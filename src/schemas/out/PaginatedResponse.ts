import { ClassType, Field, ObjectType, Int } from 'type-graphql'

export default function PaginatedResponse<TItemsFieldValue>(
  itemsFieldValue: ClassType<TItemsFieldValue> | String | Number | Boolean
) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [itemsFieldValue])
    items!: TItemsFieldValue[]

    @Field(() => Int)
    total!: number

    @Field(() => Int)
    page!: number

    @Field(() => Int)
    cntPageItem!: number

    @Field(() => Boolean)
    hasMore!: boolean
  }
  return PaginatedResponseClass
}
