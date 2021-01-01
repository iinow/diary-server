import { from, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { Provider } from '@/common/constants'
import { User } from '@/model'
import { UserMeOut } from '@/schemas/out'

type registerUser = {
  id: string
  name: string
  provider: Provider
}

export function register(profile: registerUser) {
  return from(
    User.findOne({ userId: profile.id, provider: profile.provider })
  ).pipe(
    switchMap((user) => {
      if (user) {
        return of(user)
      }
      const newUser = User.create()
      newUser.uid = uuid()
      newUser.userId = profile.id
      newUser.userName = profile.name
      newUser.provider = profile.provider
      return from(User.insert(newUser)).pipe(map(() => newUser))
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
