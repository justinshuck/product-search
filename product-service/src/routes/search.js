import isEmpty from 'lodash/isEmpty'
import async from 'async'
import { searchByItemId, searchByKeyword } from '../services/searchService'

exports.getData = (req, res) => {
  if (isEmpty(req.query) || isEmpty(req.query.keyword)) {
    return Promise.resolve([])
  }

  if (!isEmpty(req.query) && isEmpty(req.query.fullResponse) && req.query.fullResponse) {
    return new Promise((resolve, reject) => {
      searchByKeyword(req.query.keyword).then(results => {
        async.mapSeries(results, searchByItemId, (err, res) => {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
      })
    })
  }
  return searchByKeyword(req.query.keyword)
}
