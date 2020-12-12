import { registerEnumType } from 'type-graphql'

export enum Provider {
  KAKAO = 'KA',
}

registerEnumType(Provider, {
  name: 'Provider',
  description: 'OAuth Provider',
})
