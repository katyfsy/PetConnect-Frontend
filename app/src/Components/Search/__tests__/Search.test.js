import {render, screen, cleanup} from '@testing-library/react';
import Search from '../Search';


test('should render Search component', () => {
  render(<Search />);
  const searchElement = screen.getByTestId('search');
  expect(searchElement).toBeInTheDocument();
})