import { createParamDecorator } from 'type-graphql'
import { Request, Response } from 'express'

type Context = {
  req: Request
  res: Response
}

export default function DToken() {
  return createParamDecorator<Context>(
    ({ context }) => context.req.cookies.user
  )
}
