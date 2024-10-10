import * as dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'

import { serverOf, serverStart } from './server'
import { AppConfig } from './types/appConfig'

dotenv.config()

const server: FastifyInstance = serverOf()
const appConfig: AppConfig = {
  host: process.env.SERVER_HOST || '0.0.0.0',
  port: parseInt(process.env.SERVER_PORT || '8080')
}

serverStart(appConfig, server)
  .then(() => {
    console.log(`Server listening at ${appConfig.host}:${appConfig.port}`)
  })
  .catch((error) => {
    console.error(`Failed to start server: ${error}`)
  })
