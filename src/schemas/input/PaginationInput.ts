import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class PaginationInput {
  @Field(() => Int, { description: 'page >= 1' })
  page!: number

  @Field(() => Int, { description: '페이지 당 아이템 개수' })
  cntPageItem!: number
}
