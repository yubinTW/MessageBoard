import fastify, { FastifyInstance } from 'fastify'

import { connectToDb } from './plugins/mongoose'
import { MessageRouter } from './routes/message'
import { AppConfig } from './types/appConfig'

export const serverOf = () => {
  const server = fastify({ logger: true })
  server.get('/ping', async () => {
    return { message: 'pong!' }
  })
  server.register(MessageRouter)
  return server
}

export const serverStart = async (appConfig: AppConfig, server: FastifyInstance) => {
  try {
    await connectToDb(appConfig.mongodbConnectionString)
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`)
    process.exit(1)
  }

  const listenConfig = {
    host: appConfig.host,
    port: appConfig.port
  }

  try {
    await server.listen(listenConfig)
  } catch (error) {
    console.error(`Failed to start server: ${error}`)
    process.exit(1)
  }
}
