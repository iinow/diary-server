import { from, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { User } from '@/model'
import type { RegisterUser } from '@/model/User'
import { UserMeOut } from '@/schemas/out'

export function register(profile: RegisterUser) {
  return from(
    User.findOne({ userId: profile.id, provider: profile.provider })
  ).pipe(
    switchMap((user) => {
      if (user) {
        return from(user.updateEntity(profile))
      }
      return from(User.createEntity(profile))
    })
  )
}

export function rememberMe(user: User) {
  return of(new UserMeOut(user!)).toPromise()
}

export default {
  register,
  rememberMe,
}
