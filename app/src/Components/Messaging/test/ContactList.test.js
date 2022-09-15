import { render, screen, within } from '@testing-library/react'
import ContactsList from '../ContactsList'


const MockContactsList = () => {

  const chats = {
    'testuser2': [
      {
        id: "631f5c99ae410f0e7fe6dd10",
        chatId: "testuser1_testuser2",
        senderName: "testuser1",
        receiverName: "testuser2",
        senderPhoto: "https://marshallspetzone.com/blog/wp-content/uploads/2017/09/7-1.jpg",
        receiverPhoto: "https://marshallspetzone.com/blog/wp-content/uploads/2017/09/7-1.jpg",
        message: "hello from testuser1",
        timestamp: "2022-09-12T16:21:45.042",
        status: "MESSAGE"
      }
    ],
    'testuser3': [
      {
        id: "631f5c99ae410f0e7fe6dd11",
        chatId: "testuser3_testuser1",
        senderName: "testuser3",
        receiverName: "testuser1",
        senderPhoto: "https://marshallspetzone.com/blog/wp-content/uploads/2017/09/7-1.jpg",
        receiverPhoto: "https://marshallspetzone.com/blog/wp-content/uploads/2017/09/7-1.jpg",
        message: "hello from testuser3",
        timestamp: "2022-09-12T16:21:45.042",
        status: "MESSAGE"
      }
    ]
  }

  const privateChats = new Map(Object.entries(chats))


  return <ContactsList
    privateChats={privateChats}
    currentContact={'testuser2'}
    setCurrentContact
    notificationList={['testuser2']}
    username={'testuser1'}
    setNotificationList>
  </ContactsList>
}

describe('MessageChat', () => {

  test('renders contact list header', async () => {

    render(<MockContactsList />)
    const list = screen.getByText(/Contact List/i)
    expect(list).toBeInTheDocument()

  })

  test('renders list of 2 contacts', async () => {

    render(<MockContactsList />)
    const list = screen.getByRole("list")
    expect(list).toBeInTheDocument()
    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem")
    expect(items.length).toBe(2)

  })

})