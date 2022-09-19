import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Footer from '../Components/Default/Footer'
import { Container , Row } from 'react-bootstrap';
import User from '../Components/UserProfile/User';
import Search from '../Components/Search/Search';
import QuickSearch from '../Components/Search/QuickSearch';
import useStore from '../useStore';


function Home() {
  const {result, setResult, searchQuery, setSearchQuery,
    zipcode, setZipcode, radius, setRadius, breed, setBreed, type, setType} = useStore();


    return(
    <>
     <Container>
       < Header/>
     </Container>
    < Navigationbar/>
    <Container >
      <Row>
        {/* <h1>hello from home</h1> */}
        <Search setResult={setResult} searchQuery={searchQuery} setSearchQuery={setSearchQuery} zipcode={zipcode} setZipcode={setZipcode} setBreed={setBreed} setType={setType}/>
        {/* <User /> */}
      </Row>
      <Row>
        <QuickSearch setSearchQuery={setSearchQuery} setType={setType} setResult={setResult}/>
      </Row>
      <Row >
        < Footer />
      </Row>
    </Container>
    </>
  )
}

export default Home;
