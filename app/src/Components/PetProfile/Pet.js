import React from 'react';

import Navigationbar from '../Default/Navbar';
import Header from '../Default/Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Pet({petId, requiredPetFields}) {
  return (
    <>
    <Container>
      <Header/>
    </Container>
    <Navigationbar/>
    <Container></Container>
    <br />
    
    <div>pet goes here { /*requiredPetFields.owner*/ }</div>
    <br  />
    </>
      
  )
}

export default Pet;