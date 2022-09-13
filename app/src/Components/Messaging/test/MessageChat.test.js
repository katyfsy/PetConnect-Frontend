import { render, screen } from '@testing-library/react'
import MessageChat from '../MessageChat'


const MockMessageChat = () => {

  const chats = {
    'testuser2': [
      {
        id: "631f5c99ae410f0e7fe6dd10",
        chatId: "testuser1_testuser2",
        senderName: "testuser1",
        receiverName: "testuser2",
        senderPhoto: "https://marshallspetzone.com/blog/wp-content/uploads/2017/09/7-1.jpg",
        receiverPhoto: "https://marshallspetzone.com/blog/wp-content/uploads/2017/09/7-1.jpg",
        message: "hello",
        timestamp: "2022-09-12T16:21:45.042",
        status: "MESSAGE"
      }
    ]
  }

  const privateChats = new Map(Object.entries(chats))

  return <MessageChat privateChats={privateChats} currentContact={'testuser2'} username={'testuser1'} />
}



describe('MessageChat', () => {

  test('renders Message Chat', async () => {
    render(<MockMessageChat />)
    const message = screen.getByText(/hello/i)
    expect(message).toBeInTheDocument()
  })

})





