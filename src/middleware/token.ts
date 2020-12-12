import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { AUTH_TOKEN_NAME } from '@/common/constants'

const tokenMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies[AUTH_TOKEN_NAME]
  if (token) {
    const decodeValue = jwt.verify(token, process.env.jwtSecret)
    req.user = decodeValue
    next()
    return
  }
  res.redirect('http://localhost:3000/login')
}

export default tokenMiddleware
