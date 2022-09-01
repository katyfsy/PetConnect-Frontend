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

test('should render correct matches', () => {
  const matches = [
    {name: "Mr. Whiskers", type: "cat", zip: "98745"},
    {name: "Beans", type: "cat", zip: "95745"},
    {name: "Baguera", type: "cat", zip: "88745"},
    {name: "Bitey McNibble", type: "cat", zip: "78745"},
    {name: "Kitty", type: "cat", zip: "95667"}
  ];
  render(<Results matches={matches}/>);

  // div test-id is {`t-${match.zip}$${match.name}`}

  matches.map(match => {
    let testId = `t-${match.zip}${match.name}`;
    let result = screen.getByTestId(testId);
    expect(result).toBeInTheDocument();
  })

})