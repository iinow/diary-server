import passport from 'passport'
import { Strategy } from 'passport-kakao'

passport.use('login-kakao', new Strategy({
    clientID: '2d757aa5c6d0840f1d941423b5fe0ff1',
    clientSecret: '5CWqDOhlz3wnJd17RR1rwYLMfGMamhUh',
    callbackURL: 'http://localhost:7711/oauth/kakao/callback',
}, (accessToken, refreshToken, profile, done) => {
    console.log('로그인 성공임/', profile)
    return done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

export default passport