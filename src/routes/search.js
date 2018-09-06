import isEmpty from 'lodash/isEmpty'

import { searchByKeyword } from '../services/searchService'

exports.getData = (req, res) => {
  if (isEmpty(req.query) || isEmpty(req.query.keyword)) {
    return Promise.resolve([])
  }
  return searchByKeyword(req.query.keyword)
}
