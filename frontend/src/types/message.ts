export type Message = {
  messageId: string
  content: string
  author: string
  createdAt: Date
}

export type MessageBody = Omit<Message, 'messageId' | 'createdAt'>
