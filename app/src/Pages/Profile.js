import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import User from '../Components/UserProfile/User';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Profile() {
  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row className="justify-content-md-center" style={{"paddingTop": "50px"}}>
          <User />
        </Row>
      </Container>
    </>
  )
}

export default Profile;