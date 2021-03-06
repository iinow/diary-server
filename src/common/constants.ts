import { registerEnumType } from 'type-graphql'

export const AUTH_TOKEN_NAME = 'D_TOKEN'

export enum Provider {
  KAKAO = 'KA',
  GITHUB = 'GH',
}

registerEnumType(Provider, {
  name: 'Provider',
  description: 'OAuth Provider',
})

export enum ErrorType {
  UN_AUTH = '4010',
}
