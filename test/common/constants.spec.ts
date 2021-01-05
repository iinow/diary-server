import { describe, it, expect } from '@jest/globals'
import 'reflect-metadata'
import {
  AUTH_TOKEN_NAME,
  ErrorType,
  Provider,
} from '../../src/common/constants'

describe('authTokenName', () => {
  it('is not null', () => {
    expect(AUTH_TOKEN_NAME).not.toBeNull()
  })

  it('is equal name', () => {
    expect(AUTH_TOKEN_NAME).toEqual('D_TOKEN')
  })
})

describe('errorType', () => {
  it('should enum value is not undefined', () => {
    expect(Object.values(ErrorType)[0]).not.toBeNull()
  })

  it('should enum value is string type', () => {
    const enumValueType = typeof Object.values(ErrorType)[0]
    expect(enumValueType).toEqual('string')
  })
})

describe('Provider', () => {
  it('should enum value is not undefined', () => {
    expect(Object.values(Provider)[0]).not.toBeNull()
  })

  it('should enum value is string type', () => {
    const enumValueType = typeof Object.values(Provider)[0]
    expect(enumValueType).toEqual('string')
  })
})
