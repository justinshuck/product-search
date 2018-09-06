import { startServer } from './src'
import { generateLocalCache } from './src/services/cacheService'
import logger from './logger'
import itemIds from './items'


logger.info('Building cache...')
generateLocalCache(itemIds).then(() => {
  logger.info('Cache built')
  startServer()
}).catch(() => {
  logger.fatal('Cache failed to build - Service failed to start')
})
