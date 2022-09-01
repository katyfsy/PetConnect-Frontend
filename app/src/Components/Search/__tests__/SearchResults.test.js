import {render, screen, cleanup} from '@testing-library/react';
import SearchResults from '../../../Pages/SearchResults';


test('should render Results component', () => {
  render(<SearchResults />);
  const search_results = screen.getByTestId('search_results');
  expect(search_results).toBeInTheDocument();

  const searchBars = screen.getByTestId('searchBars');
  expect(searchBars).toBeInTheDocument();

  const results = screen.getByTestId('results');
  expect(results).toBeInTheDocument();

  expect(results).toHaveTextContent('Top bar');
  expect(results).toHaveTextContent('column left: advanced search');
  expect(results).toHaveTextContent('column right: cards');
})