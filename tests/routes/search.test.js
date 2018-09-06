import sinon from 'sinon'
import { expect } from 'chai'

import { getData } from '../../src/routes/search'
import * as searchService from '../../src/services/searchService'
const KEYWORD = 'backpack'

describe('search route', () => {
  let stub
  afterEach(() => {
    if (stub) stub.restore()
  })
  it('should resolve an empty array if the query is not present', async () => {
    const results = await getData({}, null)
    expect(results).to.be.an('array')
    expect(results.length).to.eq(0)
  })
  it('should resolve an empty array if the keyword is not present', async () => {
    const results = await getData({ query: {} }, null)
    expect(results).to.be.an('array')
    expect(results.length).to.eq(0)
  })
  it('should return a rejected search', () => {
    const expected = 'data'
    stub = sinon.stub(searchService, 'searchByKeyword').returns(Promise.reject(expected))
    return getData({ query: { keyword: KEYWORD } }, null).catch(err => {
      expect(err).to.eq(expected)
    })
  })
  it('should return a resolved search', () => {
    const expected = 'data2'
    stub = sinon.stub(searchService, 'searchByKeyword').returns(Promise.resolve(expected))
    return getData({ query: { keyword: KEYWORD } }, null).then(res => {
      expect(res).to.eq(expected)
    })
  })
})
