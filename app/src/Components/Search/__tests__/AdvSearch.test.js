import {render, screen, cleanup} from '@testing-library/react';
import AdvSearch from '../AdvSearch';

afterEach( () => {
  cleanup();
});

test('should render AdvSearch component', () => {
  render(<AdvSearch />);
  const searchElement = screen.getByTestId('adv-search');
  expect(searchElement).toBeInTheDocument();
})