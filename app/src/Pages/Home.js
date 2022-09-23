import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Footer from '../Components/Default/Footer';
import Slides from '../Components/Default/Slides';
import { Container , Row } from 'react-bootstrap';
import User from '../Components/UserProfile/User';
import Search from '../Components/Search/Search';
import QuickSearch from '../Components/Search/QuickSearch';
import useStore from '../useStore';
import './Home.css';

function Home() {
  const {result, setResult, searchQuery, setSearchQuery,
    zipcode, setZipcode, radius, setRadius, breed, setBreed, type, setType} = useStore();


    return(
      <div className="homeStyle">
        <div className="row">
          < Header/>
        </div>
        <div id="navBar" className="row">
          <Navigationbar/>
        </div>
        <div className="flex-wrapper-home">
          <div className="row">
            <Slides />
          </div>
          <div className="row">
            <Search setResult={setResult} searchQuery={searchQuery} setSearchQuery={setSearchQuery} zipcode={zipcode} setZipcode={setZipcode} setBreed={setBreed} setType={setType}/>
          </div>
          <div className="row">
            <QuickSearch setSearchQuery={setSearchQuery} setType={setType} setResult={setResult}/>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
  )
}


export default Home;
