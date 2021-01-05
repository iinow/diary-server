import { Express } from 'express'
import passport from 'passport'
import { kakao } from '@/middleware/passport/KakaoProvider'
import { github } from '@/middleware/passport/GithubProvider'

function init(app: Express) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  app.use(passport.initialize())
  app.use(passport.session())

  kakao.setMiddleware(app)
  github.setMiddleware(app)
}

export default init
