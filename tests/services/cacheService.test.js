import { expect } from 'chai'
import sinon from 'sinon'

import { generateLocalCache, getCache } from '../../src/services/cacheService'
import * as productService from '../../src/services/productSearch'
import itemIds from './../../items'

const ITEM = {}

describe('Cache Service', () => {
  let stub
  afterEach(() => {
    if (stub) stub.restore()
  })
  it('should get the cache', () => {
    const cache = getCache()
    expect(cache).to.be.an('array')
    expect(cache.length).to.eq(0)
  })
  it('should return an error if a request returns an error', () => {
    const errMsg = 'err'
    stub = sinon.stub(productService, 'productSearch').yields(errMsg)
    return generateLocalCache().catch(err => {
      expect(err).to.eq(errMsg)
    })
  })
  xit('should set the cache with results', () => {
    let cache = getCache()
    expect(cache).to.be.an('array')
    expect(cache.length).to.eq(0)
    stub = sinon.stub(productService, 'productSearch').yields(null, ITEM)
    return generateLocalCache().then(() => {
      cache = getCache()
      expect(cache).to.be.an('array')
      expect(cache.length).to.eq(itemIds.length)
    })
  })
})
