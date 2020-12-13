import { createParamDecorator } from 'type-graphql'
import { Request, Response } from 'express'

type Context = {
  req: Request
  res: Response
}

export default function AuthUser() {
  return createParamDecorator<Context>(({ context }) => context.req.user)
}
