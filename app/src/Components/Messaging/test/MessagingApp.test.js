import { render, act } from '@testing-library/react'
import axios from 'axios'
import MessagingApp from '../MessagingApp'
import { MemoryRouter } from "react-router";

jest.mock('axios')

describe("Messaging App", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("load Messaging App", async () => {
    render(
      <MemoryRouter>
        <MessagingApp />
      </MemoryRouter>
    );
    expect(axios.get).toHaveBeenCalledTimes(0);
  });

})
