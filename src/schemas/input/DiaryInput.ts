import { Field, InputType } from 'type-graphql'

@InputType()
export class DiaryInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  content!: string
}
