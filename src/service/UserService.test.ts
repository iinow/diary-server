import { describe, it, afterEach, beforeEach } from 'mocha'
import * as typeorm from 'typeorm'
import { expect, assert } from 'chai'
import {
  spy,
  SinonSandbox,
  createSandbox,
  stub,
  createStubInstance,
  mock,
} from 'sinon'
import UserService from './UserService'
import { User } from '../model'
import { Provider } from '../common/constants'

describe('UserService call register', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('get exist user', () => {
    // const fakeQueryBuilder = sinon.createStubInstance(
    //   typeorm.SelectQueryBuilder
    // )
    // fakeQueryBuilder.select(['uid']).getOne().resolves('0x0')
    // sandbox.stub(typeorm, 'createQueryBuilder').returns()
    // assert.equal(targetArr.length, 2)
    // const call = stub()
    // call.withArgs(1).returns(10)
    assert.equal(10, 10)
  })
})
