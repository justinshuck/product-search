import async from 'async'
import isEmpty from 'lodash/isEmpty'
import { RateLimiter } from 'limiter'
import itemIds from '../../items'
import logger from '../../logger'
import { productSearch } from '../services/productSearch'

const limiter = new RateLimiter(1, 500)

function sanitizeResults (resultsArray) {
  return resultsArray.filter(itemId => itemId !== false)
}


function limitRequests(...args) {
  limiter.removeTokens(1, () => productSearch(...args));
}
exports.getData = (req, res) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(req.query) || isEmpty(req.query.keyword)) {
      return resolve([])
    }
    async.mapSeries(itemIds, (id, cb) => limitRequests(id, req.query.keyword, cb), (err, resultsArray) => {
      if (err) {
        logger.error(err)
        return reject(err)
      }
      return resolve(sanitizeResults(resultsArray))
    })
  })
}
