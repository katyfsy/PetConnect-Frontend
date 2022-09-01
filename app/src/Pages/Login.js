import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import LoginCard from '../Components/UserProfile/LoginCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Login() {
  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row className="justify-content-md-center" style={{"paddingTop": "50px"}}>
          <LoginCard/>
        </Row>
      </Container>
    </>
  )
}

export default Login;