import { render, act } from '@testing-library/react'
import axios from 'axios'
import MessagingApp from '../MessagingApp'
import { MemoryRouter } from "react-router";

jest.mock('axios')

afterAll(() => {
  jest.clearAllMocks();
});


describe("Messaging App", () => {

  test("load Messaging App", async () => {
    await act(async () => {
      await axios.get.mockResolvedValueOnce({
        data:
        {
          "firstName": "test",
          "lastName": "user",
          "userPhoto": 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.pn',
          "username": "testuser"
        }
      })

      render(
        <MemoryRouter>
          <MessagingApp />
        </MemoryRouter>
      );
    })
    // need to update the call Times to 1 once the localStorage stors the username
    expect(axios.get).toHaveBeenCalledTimes(0);
  });


})
