import {render, screen, cleanup} from '@testing-library/react';
import SearchResults from '../../../Pages/SearchResults';


afterEach( () => {
  cleanup();
});

// const setup = () => {
//   const utils = render(<SearchResults />);

// }


test('should render SearchResults page', () => {
  render(<SearchResults />);
  const search_results = screen.getByTestId('search_results');
  expect(search_results).toBeInTheDocument();

  const searchBars = screen.getByTestId('searchBars');
  expect(searchBars).toBeInTheDocument();

  const results_inPage = screen.getByTestId('results_inPage');
  expect(results_inPage).toBeInTheDocument();

  expect(results_inPage).toHaveTextContent('Top bar');
  expect(results_inPage).toHaveTextContent('column left: advanced search');
  expect(results_inPage).toHaveTextContent('column right: cards');
})