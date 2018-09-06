import Boom from 'boom'
import config from 'config'
import request from 'request-promise'
import util from 'util'

import logger from '../../logger'

function getSearchRequestUrl (itemId) {
  return `${config.get('product.hostname')}/v1/items/${itemId}?format=json&apiKey=${config.get('product.apiKey')}`
}

function doesDescriptionContainTerm (description, term) {
  return description.toLowerCase().includes(term.toLowerCase())
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
        logger.error(`Invalid User token - ${util.inspect(res.body)}`)
        console.log('here')
        return cb(Boom.forbidden('Invalid User token'))
      }
      /**
         * If the itemId is not found - we want to remove the item from the item list
         */
      if (res.statusCode === 400) {
        return cb(null, false)
      }
      // if (!doesDescriptionContainTerm(JSON.parse(res.body).shortDescription, term)) {
      //   return cb(null, false)
      // }
      return cb(null, {
        itemId,
        shortDescription: JSON.parse(res.body).shortDescription
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