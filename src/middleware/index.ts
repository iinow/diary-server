import session from 'express-session'
import passportKakao from '@/middleware/passport'
import app from '@/app'

app.use(
  session({
    secret: 'hahaha',
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: false,
  })
)
app.use(passportKakao.initialize())
app.use(passportKakao.session())
app.get('/oauth/kakao', passportKakao.authenticate('login-kakao'))
app.get(
  '/oauth/kakao/callback',
  passportKakao.authenticate('login-kakao', {
    successRedirect: '/graphql',
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/graphql')
  }
)
