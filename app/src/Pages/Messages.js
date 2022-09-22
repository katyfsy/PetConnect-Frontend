import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import MessagingApp from '../Components/Messaging/MessagingApp';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Messages.css';

function Messages() {
  return (
    <div className='messagingPage'>
    <Container>
      <Header/>
    </Container>
    <Navigationbar/>
    <Container>
      <Row className="justify-content-md-center" style={{"paddingTop": "50px"}}>
        <MessagingApp/>
      </Row>
    </Container>
  </div>
  )
}

export default Messages;