import { getCache } from './cacheService'

const Fuse = require('fuse.js')
const options = {
  tokenize: true,
  threshold: 0,
  location: 0,
  distance: 0,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: [
    'shortDescription',
    'longDescription'
  ]
}

export function searchByKeyword (keyword) {
  return new Promise((resolve, reject) => {
    try {
      let fuse = new Fuse(getCache(), options)
      const fullResults = fuse.search(keyword).map(item => item.itemId)
      resolve(fullResults)
    } catch (err) {
      reject(err)
    }
  })
}
