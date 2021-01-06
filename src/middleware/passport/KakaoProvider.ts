import { Strategy } from 'passport-kakao'
import { BaseProvider } from '@/middleware/passport/BaseProvider'
import { register } from '@/service/UserService'
import { Provider } from '@/common/constants'

export const kakao = new BaseProvider(
  '/oauth/kakao',
  '/oauth/kakao/callback',
  'login-kakao',
  new Strategy(
    {
      clientID: process.env.oauth.provider.kakao.clientId,
      clientSecret: process.env.oauth.provider.kakao.clientSecret,
      callbackURL: process.env.oauth.provider.kakao.callbackUrl,
    },
    (accessToken, refreshToken, profile, done) => {
      register({
        id: profile.id,
        name: profile.username!,
        provider: Provider.KAKAO,
      }).subscribe((user) => {
        return done(null, user)
      })
    }
  ),
  Provider.KAKAO
)
