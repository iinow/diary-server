import passport from 'passport'
import { Strategy } from 'passport-kakao'
import { Provider } from '@/common/constants'
import { register } from '@/service/UserService'

passport.use(
  'login-kakao',
  new Strategy(
    {
      clientID: process.env.oauthKakaoClientId,
      clientSecret: process.env.oauthKakaoClientSecret,
      callbackURL: process.env.oauthKakaoCallbackUrl,
    },
    (accessToken, refreshToken, profile, done) => {
      register({
        id: profile.id,
        name: profile.username!,
        provider: Provider.KAKAO,
      }).subscribe(() => done(null, profile))
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

export default passport
