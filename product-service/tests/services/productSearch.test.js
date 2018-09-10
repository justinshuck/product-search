import Boom from 'boom'
import { expect } from 'chai'
import config from 'config'
import nock from 'nock'
import sinon from 'sinon'

import { productSearch } from '../../src/services/productSearch'

const ITEMID = '124567'
describe('Search Service Spec', () => {
  it('should return error if the request fails', async () => {
    const cbSpy = sinon.spy()
    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .replyWithError(400, 'some_error')
    const boomStub = sinon.stub(Boom, 'internal')

    await productSearch(ITEMID, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(boomStub.calledWith('Error while processing productSearch')).to.eq(true)
  })

  it('should return forbidden if the token is invalid', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(403, 'invalid_token')
    const boomStub = sinon.stub(Boom, 'forbidden')
    await productSearch(ITEMID, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(boomStub.calledWith('An error occured during product search')).to.eq(true)
  })

  it('should return false if the item is not found', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(400, 'invalid_itemId')
    await productSearch(ITEMID, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, false)).to.eq(true)
  })

  it('should return productInformation', async () => {
    const cbSpy = sinon.spy()
    const expectedObj = {
      itemId: ITEMID,
      shortDescription: 'some_desc',
      longDescription: 'some_other_desc'
    }
    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(200, {
        shortDescription: expectedObj.shortDescription,
        longDescription: expectedObj.longDescription
      })
    await productSearch(ITEMID, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, expectedObj)).to.eq(true)
  })
  it('should return false if it cannot process the product response', async () => {
    const cbSpy = sinon.spy()

    nock(config.get('product.hostname'))
      .get(`/v1/items/${ITEMID}?format=json&apiKey=${config.get('product.apiKey')}`)
      .reply(200, '')
    await productSearch(ITEMID, cbSpy)
    expect(cbSpy.calledOnce).to.eq(true)
    expect(cbSpy.calledWith(null, false)).to.eq(true)
  })
})
