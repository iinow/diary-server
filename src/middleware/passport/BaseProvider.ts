import passport, { Strategy } from 'passport'
import jwt from 'jsonwebtoken'
import { RequestHandler, Express } from 'express'
import moment from 'moment'
import { User } from '@/model'
import { getJwtObject } from '@/model/type/JwtObject'
import { AUTH_TOKEN_NAME, Provider } from '@/common/constants'

export class BaseProvider {
  constructor(
    loginPath: string,
    loginCallbackPath: string,
    name: string,
    strategy: Strategy,
    provider: Provider
  ) {
    this.loginPath = loginPath
    this.loginCallbackPath = loginCallbackPath
    this.name = name
    this.strategy = strategy
    this.provider = provider
  }

  public loginPath: string

  public loginCallbackPath: string

  public name: string

  public strategy: Strategy

  public provider: Provider

  public getRequestHandler(): RequestHandler {
    return (req, res) => {
      const user = req.user as User
      if (user) {
        const token = jwt.sign(getJwtObject(user), process.env.jwtSecret, {
          expiresIn: 60 * 60,
        })

        res.cookie(AUTH_TOKEN_NAME, token, {
          expires: moment().add('hour', 1).toDate(),
        })
        res.redirect(process.env.oauth.webRedirectUrl)
        return
      }
      res.redirect('/')
    }
  }

  public setMiddleware(app: Express) {
    passport.use(this.name, this.strategy)
    app.get(this.loginPath, passport.authenticate(this.name))
    app.get(
      this.loginCallbackPath,
      passport.authenticate(this.name),
      this.getRequestHandler()
    )
  }
}
