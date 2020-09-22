import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'
import {
  FindBookQuery,
  FindBooksQuery,
  FindAuthorsQuery,
  FindAuthorQuery
} from '~/schemas/query'
import { AddAuthor, AddBook } from '~/schemas/mutation'
import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync } from 'type-graphql'
import { BookResolver } from '~/schemas/resolver/BookResolver'

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: FindBookQuery,
    books: FindBooksQuery,
    author: FindAuthorQuery,
    authors: FindAuthorsQuery
  })
})

const RootMutationType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: AddBook,
    addAuthor: AddAuthor
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

// const apollo = new ApolloServer({
//   schema: buildSchemaSync({
//     resolvers: [
//       BookResolver
//     ]
//   }),
//   playground: true,
//   context: ({ req, res }) => ({ req, res })
// })

export default schema
