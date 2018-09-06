import async from 'async'
import isEmpty from 'lodash/isEmpty'

import itemIds from '../../items'
import logger from '../../logger'
import { productSearch } from '../services/productSearch'

function sanitizeResults (resultsArray) {
  return resultsArray.filter(itemId => itemId !== false)
}

exports.getData = (req, res) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(req.query) || isEmpty(req.query.keyword)) {
      return resolve([])
    }
    async.mapSeries(itemIds, (id, cb) => productSearch(id, req.query.keyword, cb), (err, resultsArray) => {
      if (err) {
        logger.error(err)
        return reject(err)
      }
      return resolve(sanitizeResults(resultsArray))
    })
  })
}
