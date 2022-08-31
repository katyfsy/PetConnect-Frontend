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
        <Row className="justify-content-md-center" style={{"padding-top": "50px"}}>
          <Search setResult={setResult}/>
          <Results matches={result}/>
        </Row>
      </Container>
    </>
  )
}

export default SearchResults;