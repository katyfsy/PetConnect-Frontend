import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import SignUpCard from '../Components/UserProfile/SignUpCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function SignUp() {
  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row className="justify-content-md-center" style={{"paddingTop": "50px"}}>
          <SignUpCard/>
        </Row>
      </Container>
    </>
  )
}

export default SignUp;