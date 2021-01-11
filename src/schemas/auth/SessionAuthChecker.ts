import { AuthChecker } from 'type-graphql'
import { Request, Response } from 'express'
import { of, throwError } from 'rxjs'
import { map } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'
import { unAuthorizeError } from '@/error/UnAuthorizeError'
import { User } from '@/model'

type Context = {
  req: Request
  res: Response
}

function isUser(user: any): user is User {
  return user !== undefined
}

export const authChecker: AuthChecker<Context> = ({ context: { req } }) => {
  return of(req.user)
    .pipe(
      flatMap((user) => {
        if (isUser(user)) {
          return User.findOne({ uid: user.uid })
        }
        return throwError(unAuthorizeError)
      }),
      map((user) => user !== undefined)
    )
    .toPromise()
}
