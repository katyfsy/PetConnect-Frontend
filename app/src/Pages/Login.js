import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import LoginCard from '../Components/UserProfile/LoginCard';
import Footer from '../Components/Default/Footer'
import { Container , Row } from 'react-bootstrap';


const Login = () => {
  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row className="justify-content-md-center" style={{"paddingTop": "20px"}}>
          <LoginCard/>
        </Row>
      </Container>
      < Footer />
    </>
  )
}

export default Login;