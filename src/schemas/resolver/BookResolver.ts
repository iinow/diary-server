import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Int,
} from 'type-graphql'
import { Book } from '@/model'
import { Books } from '@/mock'
import { BookInput } from '@/schemas/input'
import { of } from 'rxjs'
import { delay, map, tap } from 'rxjs/operators'

@ObjectType()
export class User {
  @Field(() => String)
  id!: string

  @Field() // () => String은 생략가능
  email!: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  username?: string

  @Field(() => Int, { nullable: true })
  age?: number
}

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books(): Book[] {
    return Books.books
  }

  @Query(() => Book)
  findBookById(
    @Arg('id', () => Int, { description: '책 아이디 값' }) id: number
  ): Promise<Book | undefined> {
    return of(id)
      .pipe(
        map((bookId) => Books.books.find((book) => book.id === bookId)),
        delay(1000)
      )
      .toPromise()
  }

  @Mutation(() => Book)
  async addBook(@Arg('book') inputBook: BookInput): Promise<Book> {
    return of(inputBook)
      .pipe(
        map(
          (newBook) =>
            new Book(Books.books.length, newBook.authorId, newBook.name)
        ),
        tap((newBook) => Books.books.push(newBook))
      )
      .toPromise()
  }
}
