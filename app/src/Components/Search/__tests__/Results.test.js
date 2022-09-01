import {render, screen, cleanup} from '@testing-library/react';
import Results from '../Results';


test('should render Results component', () => {
  render(<Results />);
  const resultsElement = screen.getByTestId('results');
  expect(resultsElement).toBeInTheDocument();
  expect(resultsElement).toHaveTextContent('Top bar');
  expect(resultsElement).toHaveTextContent('column left: advanced search');
  expect(resultsElement).toHaveTextContent('column right: cards');


})