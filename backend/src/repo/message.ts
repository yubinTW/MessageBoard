import MessageModel from '../models/message'
import { Message } from '../types/message'

export const getAllMessages: () => Promise<Message[]> = async () => {
  return MessageModel.find()
}

export const createMessage: (message: Message) => Promise<Message> = async (message) => {
  return MessageModel.create(message)
}
