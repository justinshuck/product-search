import config from 'config'
import Hapi from 'hapi'
import Joi from 'joi'

import logger from '../logger'
import { getData } from './routes/search'

const { port } = config.get('serverConfig')
const server = new Hapi.Server({
  port,
  routes: {
    cors: true
  }
})

// Setup server routes
server.route({
  method: 'GET',
  path: '/productSearch',
  handler: getData,
  options: {
    validate: {
      query: {
        keyword: Joi.string(),
        fullResponse: Joi.boolean()
      }
    }
  }
})

export async function startServer () {
  try {
    await server.start()
  } catch (e) {
    logger.fatal(e)
    process.exitCode(1)
  }

  logger.info(`Service started on port ${server.info.port}`)
}
