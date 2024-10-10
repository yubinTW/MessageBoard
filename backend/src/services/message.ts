import * as uuid from 'uuid'

import * as messageRepo from '../repo/message'
import { Message, MessageBody } from '../types/message'

export const getAllMessages = async () => {
  return messageRepo.getAllMessages()
}

export const addMessage = async (messageBody: MessageBody) => {
  const message: Message = {
    ...messageBody,
    messageId: uuid.v4(),
    createdAt: new Date()
  }
  return messageRepo.createMessage(message)
}
