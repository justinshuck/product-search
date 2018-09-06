import { getCache } from './cacheService'

const Fuse = require('fuse.js')
export function searchByKeyword (keyword) {
  return new Promise((resolve, reject) => {
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
    const fuse = new Fuse(getCache(), options)
    const fullResults = fuse.search(keyword).map(item => item.itemId)
    console.log(fullResults)
    resolve(fullResults)
  })
}
