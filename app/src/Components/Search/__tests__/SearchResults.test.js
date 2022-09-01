/* eslint-disable testing-library/no-debugging-utils */
import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchResults from '../../../Pages/SearchResults';


afterEach( () => {
  cleanup();
});


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

test('when user types dog in search bar, the results matches should show dogs', async () => {
  render(<SearchResults />);
  // const inputBox = screen.getByTestId('search_input_bar');
  // const searchButton = screen.getByRole('button', {  name: /search/i});
  // await userEvent.type(inputBox, 'dog');
  // userEvent.click(searchButton);


  screen.debug();
  // const testId = 't-58745Buster';
  // const result = screen.getByTestId(testId);
  // console.log(result);
  // expect(result).toBeInTheDocument();


  // const matches = [
  //   {name: "Sam", type: "dog", zip: "98745"},
  //   {name: "Bark Twain", type: "dog", zip: "68745"},
  //   {name: "Buster", type: "dog", zip: "58745"},
  //   {name: "Chewy", type: "dog", zip: "48745"}
  // ];
  // matches.map(match => {
  //   let testId = `t-${match.zip}${match.name}`;
  //   let result = screen.getByTestId(testId);
  //   expect(result).toBeInTheDocument();
  // })


})

