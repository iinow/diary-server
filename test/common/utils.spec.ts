import { describe, it, expect } from '@jest/globals'
import { add } from '../../src/common/utils'

describe('utils', () => {
  it('should return 0 value', () => {
    expect(add(1, -1)).toEqual(0)
  })
})
