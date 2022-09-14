import { fireEvent, render, screen } from '@testing-library/react'
import InputBar from '../InputBar'


const MockInputBar = () => {
  const userData = {
    username: 'testuser1',
    receiverName: 'testuser2',
    connected: true,
    message: "hello",
    senderPhoto: "",
    receiverPhoto: ""
  }

  const mockedHandleSend = jest.fn()
  const mockedHandleMessage = jest.fn()
  const mockedsetUserData = jest.fn()

  return <InputBar handleSend={mockedHandleSend} handleMessage={mockedHandleMessage} setUserData={mockedsetUserData} userData={userData} currentContact />
}



describe('InputBar', () => {

  test('renders message input bar and send button', async () => {

    render(<MockInputBar />)
    const inputBar = screen.getByPlaceholderText(/Enter message/i)
    const sendButton = screen.getByRole('button')

    expect(inputBar).toBeInTheDocument()
    expect(sendButton).toBeInTheDocument()
  })

  test('renders input message', async () => {
    render(<MockInputBar />)
    const inputBar = screen.getByPlaceholderText(/Enter message/i)
    fireEvent.change(inputBar, { target: { value: 'hello' } })
    expect(inputBar.value).toBe('hello')
  })

  // test('empty the input bar when send button is clicked', async () => {
  //   render(<MockInputBar />)
  //   const inputBar = screen.getByPlaceholderText(/Enter message/i)
  //   const sendButton = screen.getByRole('button', { name: /Send/i })
  //   fireEvent.change(inputBar, { target: { value: 'hello' } })
  //   fireEvent.click(sendButton)
  //   expect(inputBar.value).toBe('')
  // })



})





