import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import LoginCard from '../Components/UserProfile/LoginCard';
import Footer from '../Components/Default/Footer'
import { Container , Row } from 'react-bootstrap';
import "./Login.css";


const Login = () => {
  return (
    <>
      <Container>
        <Header/>
      </Container>
        <Navigationbar/>
        <Container>
        <div className="flex-wrapper-login-page">
          <Row className="justify-content-md-center" style={{"paddingTop": "20px"}}>
            <LoginCard/>
          </Row>
      </div>
      </Container>
      < Footer />
    </>
  )
}

export default Login;