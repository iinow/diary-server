import { Field, InputType } from 'type-graphql'
import moment from 'moment'

@InputType()
export class DiaryInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  content!: string

  @Field()
  yyyyMMdd!: string

  toDate(): Date {
    return moment(this.yyyyMMdd, 'YYYYMMDD').toDate()
  }
}
