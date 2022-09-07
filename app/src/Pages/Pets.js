import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Footer from '../Components/Default/Footer';
import Pet from '../Components/PetProfile/Pet';
import AddAPetForm from '../Components/PetProfile/AddAPetForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import AddAPetFormFunctional from '../Components/PetProfile/AddAPetFormFunctional';

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

      <Row className="justify-content-md-center" style={{"padding-top": "50px"}}>
        <AddAPetFormFunctional/>
      </Row>
      <Row >
        < Footer />
      </Row>
    </Container>
  </>
  )
}

export default Pets;