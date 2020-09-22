import chance from 'chance'
import { Book } from '~/model'

const mock = chance()

export interface Author {
  id: number,
  name: string,
}

const books: Book[] = Array.apply(null, Array(5)).map((v, index) => ({
  id: index,
  authorId: index,
  name: mock.name(),
  createAt: mock.date(),
}))

const authors: Author[] = Array.apply(null, Array(5)).map((v, index) => ({
  id: index,
  name: mock.name()
}))

export default {
  books,
  authors
}
