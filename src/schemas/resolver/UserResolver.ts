import { Resolver, Query, Authorized } from 'type-graphql'
import { User } from '@/model'
import { UserMeOut } from '@/schemas/out/UserMeOut'
import { AuthUser } from '@/schemas/decorators'
import { rememberMe } from '@/service/UserService'

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserMeOut)
  me(@AuthUser() user: User): Promise<UserMeOut> {
    return rememberMe(user)
  }
}
