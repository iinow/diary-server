import { ApolloError } from 'apollo-server'
import { ErrorType } from '@/common/constants'

export class UnAuthorizeError extends ApolloError {
  constructor() {
    super('로그인을 해주세요.', ErrorType.UN_AUTH)
  }
}

export const unAuthorizeError = new UnAuthorizeError()
