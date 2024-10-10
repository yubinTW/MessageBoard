import React, { useState } from 'react'
import { Modal, Button, Input, Form, message as notifyMessage } from 'antd'
import { addMessage } from '../services/message'

const isInvalidMessage = (author: string, content: string) => {
  return author.trim() === '' || content.trim() === ''
}

interface PostNewMessageProps {
  onMessagePosted: () => void
}

const PostNewMessage: React.FC<PostNewMessageProps> = ({ onMessagePosted }) => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [notifyMessageApi, contextHolder] = notifyMessage.useMessage()

  const handleSubmit = () => {
    if (isInvalidMessage(author, content)) {
      notifyMessageApi.error('Author and message cannot be empty!')
      return
    }
    addMessage({ author, content })
      .then(() => {
        console.log('Message posted')
        setAuthor('')
        setContent('')
        setIsModalVisible(false)
        notifyMessageApi.success('Message posted!')
        onMessagePosted()
      })
      .catch((error) => {
        console.error('Failed to post message', error)
        notifyMessageApi.error('Failed to post message')
      })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div style={{ textAlign: 'right' }}>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Post New Message
      </Button>
      <Modal
        title="Post New Message"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isInvalidMessage(author, content) }}
      >
        <Form>
          <Form.Item label="Author" name="author" labelCol={{ span: 4 }}>
            <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} autoComplete={'off'} />
          </Form.Item>
          <Form.Item label="Content" name="content" labelCol={{ span: 4 }}>
            <Input.TextArea rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PostNewMessage
