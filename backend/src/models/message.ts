import mongoose, { model, Schema } from 'mongoose'

import { Message } from '../types/message'

const messageSchema: Schema = new Schema(
  {
    messageId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: false
  }
)

messageSchema.set('toJSON', {
  versionKey: false
})

export default mongoose.models.message || model<Message>('message', messageSchema)
