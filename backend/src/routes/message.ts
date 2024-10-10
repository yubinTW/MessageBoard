import { FastifyInstance, RouteShorthandOptions } from 'fastify'

import { addMessage, getAllMessages } from '../services/message'
import { MessageBody } from '../types/message'

export const MessageRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  server.get('/api/v1/messages', async (request, reply) => {
    try {
      const messages = await getAllMessages()
      return reply.status(200).send({ messages })
    } catch (error) {
      server.log.error(`Failed to get messages: ${error}`)
      return reply.status(500).send({ error })
    }
  })
  server.post<{ Body: MessageBody }>('/api/v1/messages', async (request, reply) => {
    try {
      const messageBody = request.body
      const message = await addMessage(messageBody)
      return reply.status(201).send({ message })
    } catch (error) {
      server.log.error(`Failed to add message: ${error}`)
      return reply.status(500).send({ error })
    }
  })
  done()
}
