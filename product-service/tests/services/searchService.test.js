import { expect } from 'chai'
import sinon from 'sinon'

import * as searchService from '../../src/services/searchService'
import * as cacheService from '../../src/services/cacheService'

const KEYWORD = 'backpack'
describe('search service', () => {
  let stub
  afterEach(() => {
    if (stub) stub.restore()
  })
  it('should return filtered response', () => {
    const cacheObject = [{
      itemId: 'a',
      shortDescription: KEYWORD
    }, {
      itemId: 'b',
      longDescription: KEYWORD
    }, {
      itemId: 'c',
      shortDescription: 'none'
    }]
    const expected = [ 'a', 'b' ]
    stub = sinon.stub(cacheService, 'getCache').returns(cacheObject)
    searchService.searchByKeyword(KEYWORD).then(results => {
      expect(results).to.deep.equal(expected)
    })
  })

  it('should return error if the search fails', () => {
    const errMsg = 'some_err'
    stub = sinon.stub(cacheService, 'getCache').throws(errMsg)
    searchService.searchByKeyword(KEYWORD).catch(err => {
      expect(err.name).to.eq(errMsg)
    })
  })
})
