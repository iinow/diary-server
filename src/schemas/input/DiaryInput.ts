import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class DiaryInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: false })
  journalId!: number

  @Field()
  title!: string

  @Field()
  content!: string
}
