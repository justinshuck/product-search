import Boom from 'boom'
import config from 'config'
import request from 'request-promise'
import util from 'util'

import logger from '../../logger'

function getSearchRequestUrl (itemId) {
  return `${config.get('product.hostname')}/v1/items/${itemId}?format=json&apiKey=${config.get('product.apiKey')}`
}

export function productSearch (itemId, cb) {
  const options = {
    method: 'GET',
    uri: getSearchRequestUrl(itemId),
    resolveWithFullResponse: true,
    simple: false
  }
  return request(options).then(res => {
    try {
      /**
         * If the token is invalid - we want to exit immediately
         */
      if (res.statusCode === 403) {
        logger.error(`${res.statusCode}: ${util.inspect(res.body)}`)
        return cb(Boom.forbidden('An error occured during product search'))
      }
      /**
         * If the itemId is not found - we want to remove the item from the item list
         */
      if (res.statusCode === 400) {
        return cb(null, false)
      }
      const { shortDescription, longDescription } = JSON.parse(res.body)
      return cb(null, {
        itemId,
        shortDescription,
        longDescription

      })
    } catch (e) {
      /**
           * If there's an error parsing the body and inspecting the description -
           *      Do the appropriate logging and proceed
           */
      logger.error(`Error processing description for itemId ${itemId}`)
      logger.error(e)
      return cb(null, false)
    }
  }).catch((err) => {
    logger.error(`Error during productSearch for ${itemId}`)
    logger.error(util.inspect(err))
    return cb(Boom.internal('Error while processing productSearch'))
  })
}
