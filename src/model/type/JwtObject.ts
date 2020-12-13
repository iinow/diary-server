import { Provider } from '@/common/constants'
import { User } from '@/model'

export type JwtObject = {
  uid: string
  provider: Provider
}

export function getJwtObject(user: User): JwtObject {
  return {
    uid: user.uid,
    provider: user.provider,
  }
}
