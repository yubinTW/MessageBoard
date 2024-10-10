import * as uuid from 'uuid'

import * as messageRepo from '../repo/message'
import { Message, MessageBody } from '../types/message'

export const getAllMessages: () => Promise<Message[]> = async () => {
  return messageRepo.getAllMessages()
}

export const addMessage: (messageBody: MessageBody) => Promise<Message> = async (messageBody) => {
  const message: Message = {
    ...messageBody,
    messageId: uuid.v4(),
    createdAt: new Date()
  }
  return messageRepo.createMessage(message)
}
