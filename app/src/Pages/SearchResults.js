import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Search from '../Components/Search/Search';
import Results from '../Components/Search/Results';
import AdvSearch from '../Components/Search/AdvSearch';
import SearchTopBar from '../Components/Search/SearchTopBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useStore from '../useStore';
import Footer from '../Components/Default/Footer';

function SearchResults() {
  // const [result, setResult] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [radius, setRadius] = useState("10");
  // const [breed, setBreed] = useState("");
  // const [type, setType] = useState("");

  const {result, setResult, searchQuery, setSearchQuery,
  zipcode, setZipcode, radius, setRadius, breed, setBreed, type, setType} = useStore();


  return (
    <>
      <Container className="searchResults">
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row
        className="justify-content-md-center">
          <div data-testid="search_results">
            <div data-testid="searchBars"> <Search setResult={setResult} searchQuery={searchQuery} setSearchQuery={setSearchQuery} zipcode={zipcode} setZipcode={setZipcode} setBreed={setBreed} setType={setType}/> </div>
            <SearchTopBar searchQuery={searchQuery} radius={radius} setRadius={setRadius} zipcode={zipcode}/>
            <div data-testid="results_inPage"> <Results zipcode={zipcode} searchQuery={searchQuery} setResult={setResult} matches={result} radius={radius} type={type} setType={setType} breed={breed} setBreed={setBreed}/> </div>
          </div>
        </Row>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  )
}

export default SearchResults;