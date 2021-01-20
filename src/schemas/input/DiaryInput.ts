import { Field, InputType } from 'type-graphql'

@InputType()
export class DiaryInput {
  @Field({ nullable: true })
  id?: number

  @Field({ nullable: false })
  journalId!: number

  @Field()
  title!: string

  @Field()
  content!: string
}
