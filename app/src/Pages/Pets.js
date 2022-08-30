import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Pet from '../Components/PetProfile/Pet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Pets() {
  return (
    <>
    <Container>
      <Header/>
    </Container>
    <Navigationbar/>
    <Container>
      <Row className="justify-content-md-center" style={{"padding-top": "50px"}}>
        <Pet/>
      </Row>
    </Container>
  </>
  )
}

export default Pets;