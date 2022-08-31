import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Results from '../Components/Search/Results';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function SearchResults() {
  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row className="justify-content-md-center" style={{"padding-top": "50px"}}>
          <Results />
        </Row>
      </Container>
    </>
  )
}

export default SearchResults;