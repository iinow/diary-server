import { AuthChecker } from 'type-graphql'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AUTH_TOKEN_NAME } from '@/common/constants'
import { User } from '@/model'
import { JwtObject } from '@/model/type/JwtObject'
import { of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'

type Context = {
  req: Request
  res: Response
}

export const authChecker: AuthChecker<Context> = ({ context: { req } }) => {
  return of(req.cookies[AUTH_TOKEN_NAME])
    .pipe(
      map((token) => jwt.verify(token, process.env.jwtSecret) as JwtObject),
      flatMap((obj) => User.findOne({ uid: obj.uid })),
      tap((user) => {
        if (user) {
          req.user = user
        }
      }),
      map((user) => user !== undefined)
    )
    .toPromise()
}
