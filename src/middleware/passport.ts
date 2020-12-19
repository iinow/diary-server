import { Express } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-kakao'
import jwt from 'jsonwebtoken'
import { AUTH_TOKEN_NAME, Provider } from '@/common/constants'
import { register } from '@/service/UserService'
import { User } from '@/model'
import { getJwtObject } from '@/model/type/JwtObject'
import moment from 'moment'

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
      }).subscribe((user) => {
        return done(null, user)
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

function init(app: Express) {
  app.use(passport.initialize())
  app.use(passport.session())
  app.get('/oauth/kakao', passport.authenticate('login-kakao'))
  app.get(
    '/oauth/kakao/callback',
    passport.authenticate('login-kakao'),
    (req, res) => {
      const user = req.user as User
      if (user) {
        const token = jwt.sign(getJwtObject(user), process.env.jwtSecret, {
          expiresIn: 60 * 60,
        })

        res.cookie(AUTH_TOKEN_NAME, token, {
          expires: moment().add('hour', 1).toDate(),
        })
        res.redirect('http://localhost:3000')
        return
      }
      res.redirect('/')
    }
  )
}

export default init
