import Boom from 'boom'
import sinon from 'sinon'
import { expect } from 'chai'
import nock from 'nock'
import config from 'config'
import { productSearch } from '../../src/services/productSearch'

const ITEMID = '124567'
const KEYWORD = 'backpack'
describe('Search Service Spec', () => {
  it('should return error if the request fails', async () => {
    const cbSpy = sinon.spy()
    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .replyWithError(400, 'some_error')
    const boomStub = sinon.stub(Boom, 'internal')

    await productSearch(ITEMID, KEYWORD, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(boomStub.calledWith('Error while processing productSearch')).to.eq(true)
  })
  it('should return forbidden if the token is invalid', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(403, 'invalid_token')
    const boomStub = sinon.stub(Boom, 'forbidden')
    await productSearch(ITEMID, KEYWORD, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(boomStub.calledWith('Invalid User token')).to.eq(true)
  })

  it('should return false if the item is not found', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(400, 'invalid_itemId')
    await productSearch(ITEMID, KEYWORD, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, false)).to.eq(true)
  })

  it('should return false if the keyword does not match', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(200, {
        shortDescription: 'some short description'
      })
    await productSearch(ITEMID, KEYWORD, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, false)).to.eq(true)
  })
  it('should return false if it cannot process the product response', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(200, {})
    await productSearch(ITEMID, KEYWORD, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, false)).to.eq(true)
  })

  it('should retun the itemId if the descption contains the keyword', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(200, {
        shortDescription: `some short description ${KEYWORD}`
      })
    await productSearch(ITEMID, KEYWORD, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, ITEMID)).to.eq(true)
  })
})
