import { registerEnumType } from 'type-graphql'

export const AUTH_TOKEN_NAME = 'D_TOKEN'

export enum Provider {
  KAKAO = 'KA',
}

registerEnumType(Provider, {
  name: 'Provider',
  description: 'OAuth Provider',
})
