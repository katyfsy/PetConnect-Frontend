import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Footer from '../Components/Default/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function Home() {
  return(
    <>
     <Container>
       < Header/>
     </Container>
    < Navigationbar/>
    <Container >
      <Row>
        <h1>hello from home</h1>
      </Row>
      <Row >
        < Footer />
      </Row>
    </Container>
    </>
  )
}

export default Home;
