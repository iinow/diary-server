import { Resolver, Query, Authorized } from 'type-graphql'
import { of } from 'rxjs'
import { User } from '@/model'
import { UserMeOut } from '@/schemas/out/UserMeOut'
import { AuthUser } from '@/schemas/decorators'

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserMeOut)
  me(@AuthUser() user: User): Promise<UserMeOut> {
    return of(new UserMeOut(user!)).toPromise()
  }
}
