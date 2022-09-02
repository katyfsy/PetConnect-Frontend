import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import User from '../Components/UserProfile/User';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function Profile() {
  function displayLoggedIn(){
    let username = localStorage.getItem('username')
    if (username == null || username == ""){
      console.log("no username found")
    } else {
      console.log(username)
    }
  }

  function clearStorage(){
    localStorage.setItem('token', "")
    localStorage.setItem('username', "")

  }
  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  function displayToken(){
    let token = localStorage.getItem('token')
    if (token == null || token == ""){
      console.log("no token found")
    } else {
      console.log(JSON.parse(token))
    }
  }
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
        <Row>
        <Button variant='outline-dark' onClick={displayLoggedIn}>
            Show Logged In User
        </Button>
        <Button variant='outline-dark' onClick={displayToken}>
            Get Token
        </Button>
        <Button variant='outline-dark' onClick={clearStorage}>
            Sign Out
        </Button>
        </Row>
      </Container>
    </>
  )
}

export default Profile;