import sinon from 'sinon'
import { expect } from 'chai'

import { getData } from '../../src/routes/search'
import * as productService from '../../src/services/productSearch'
import itemIds from '../../items'
const ITEMID = '124567'
const KEYWORD = 'backpack'

describe('search route', () => {
  let stub
  afterEach(() => {
    if (stub) stub.restore()
  })
  it('should resolve an empty array if the keyword is not present', () => {
    return getData({}, null).then(response => {
      expect(response).to.be.an('array')
      expect(response.length).to.eq(0)
    })
  })
  it('should reject with an error if the series of requests fail', () => {
    const errorMsg = 'some_msg'
    stub = sinon.stub(productService, 'productSearch').yields(errorMsg)
    return getData({ query: { keyword: KEYWORD } })
      .catch(e => {
        expect(e).to.eq(errorMsg)
      })
  })
  it('should resolve results', () => {
    stub = sinon.stub(productService, 'productSearch').yields(null, ITEMID)
    return getData({ query: { keyword: KEYWORD } })
      .then(response => {
        expect(response).to.be.an('array')
        expect(response.length).to.eq(itemIds.length)
      })
  })
})
