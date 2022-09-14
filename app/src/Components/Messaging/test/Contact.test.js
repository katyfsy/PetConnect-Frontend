import { render, screen } from '@testing-library/react'
import Contact from '../Contact'


const MockContact = () => {

  return <Contact
    contact={'testuser2'}
    setCurrentContact
    notificationList={['testuser2']}
    setNotificationList
    username={'testuser1'}
    currentContact={'testuser2'}
    photo
  />
}



describe('Individual Contact', () => {

  test('renders Contact name and image', async () => {
    render(<MockContact />)
    const contact = screen.getByText(/testuser2/i)
    const image = screen.getByRole('img')
    expect(contact).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })


})





