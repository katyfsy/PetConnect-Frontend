import React, {useState, useEffect} from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Search from '../Components/Search/Search';
import Results from '../Components/Search/Results';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function SearchResults() {
  const [result, setResult] = useState([]);

  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row
        className="justify-content-md-center">
          <div data-testid="search_results">
            <div data-testid="searchBars"> <Search setResult={setResult}/> </div>
            <div data-testid="results_inPage"> <Results matches={result}/> </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default SearchResults;