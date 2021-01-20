import { Resolver, Query, Authorized } from 'type-graphql'
import { AuthUser } from '@/schemas/decorators'
import { findJournalByUser } from '@/service/JournalService'
import { Journal, User } from '@/model'

@Resolver()
export class JournalResolver {
  @Authorized()
  @Query(() => [Journal], { description: 'journal 리스트' })
  journals(@AuthUser() user: User): Promise<Journal[]> {
    return findJournalByUser(user)
  }
}
