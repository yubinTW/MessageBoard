import fastify, { FastifyInstance } from 'fastify'

import { AppConfig } from './types/appConfig'

export const serverOf = () => {
  const server = fastify({ logger: true })
  server.get('/ping', async () => {
    return { message: 'pong!' }
  })
  return server
}

export const serverStart = async (appConfig: AppConfig, server: FastifyInstance) => {
  const listenConfig = {
    host: appConfig.host,
    port: appConfig.port
  }
  await server.listen(listenConfig)
}
