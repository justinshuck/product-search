import { startServer } from './src'
import { generateLocalCache } from './src/services/cacheService'
import logger from './logger'

logger.info('Building cache...')
async function getData() {
    return  await generateLocalCache()
}
getData().then((data) => {
    console.log(data)
    console.log('done')
    if (!data) {
        startServer()
    }
})