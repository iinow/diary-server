import { Field, InputType } from 'type-graphql'
import { Book } from '@/model'

@InputType()
export class BookInput implements Partial<Book> {
  @Field()
  authorId!: number

  @Field()
  name!: string
}
