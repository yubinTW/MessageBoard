import MessageModel from '../models/message'
import { Message } from '../types/message'

export const getAllMessages = async (): Promise<Message[]> => {
  return MessageModel.find()
}

export const createMessage = async (message: Message): Promise<Message> => {
  return MessageModel.create(message)
}
