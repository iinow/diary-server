import { Resolver, Query } from 'type-graphql'
import { of } from 'rxjs'
import { User } from '@/model'
import { UserMeOut } from '@/schemas/out/UserMeOut'
import { DToken } from '@/schemas/decorators'

@Resolver()
export class UserResolver {
  @Query(() => UserMeOut)
  me(@DToken() user: User): Promise<UserMeOut> {
    return of(new UserMeOut(user!)).toPromise()
  }
}
