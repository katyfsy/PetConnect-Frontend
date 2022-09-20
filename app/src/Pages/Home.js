import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Footer from '../Components/Default/Footer'
import { Container , Row } from 'react-bootstrap';
import User from '../Components/UserProfile/User';


function Home() {
  return(
    <>
     <Container style={{backgroundColor: "white"}}>
       < Header/>
     </Container>
    < Navigationbar/>
    <Container >
      <Row>
        <h1>hello from home</h1>
        <User />
      </Row>
      <Row >
        < Footer />
      </Row>
    </Container>
    </>
  )
}

export default Home;
