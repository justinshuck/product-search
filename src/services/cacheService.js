import async from 'async'
import { RateLimiter } from 'limiter'

import itemIds from '../../items'
import logger from '../../logger'
import { productSearch } from './productSearch'

const limiter = new RateLimiter(1, 500)
function sanitizeResults (resultsArray) {
  return resultsArray.filter(itemId => itemId !== false)
}
function throttleRequests (...args) {
  return limiter.removeTokens(1, () => productSearch(...args))
}

let cacheData = []

export function generateLocalCache () {
  return new Promise((resolve, reject) => {
    async.mapSeries(itemIds, throttleRequests, (err, resultsArray) => {
      if (err) {
        logger.error(err)
        return reject(err)
      }
      cacheData = sanitizeResults(resultsArray)
      resolve()
    })
  })
}

export function getCache () {
  return cacheData
}
