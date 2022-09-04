import './Profile.css';
import React, { useState, useEffect } from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import ReviewSummary from '../Components/UserProfile/ReviewSummary';
import Reviews from '../Components/UserProfile/Reviews';
import getUser from '../Components/UserProfile/DummyData';

function Profile() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    userType: 'individual',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    userPhoto: ''
  });

  useEffect(() => {
    const doGetUser = async () => {
      const result = await getUser();
      setForm(result);
    }
    doGetUser();
  }, []);

  function displayLoggedIn(){
    let username = localStorage.getItem('username')
    if (username === null || username === ""){
      console.log("no username found")
    } else {
      console.log(username)
    }
  }

  function clearStorage(){
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    console.log("signed out");
  }
  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  function getUsername() {
    const username = localStorage.getItem('username');
    return username;
  }

  function displayToken(){
    let token = localStorage.getItem('token')
    if (token === null || token === ""){
      console.log("no token found")
    } else {
      console.log(JSON.parse(token))
    }
  }

  const renderEditOrMessageButton = () => {
    if(getUsername() === "" || getUsername() === null) {
      return <Button variant="primary" size="lg" href="/login" onClick={() => alert("Please login first to chat with the user.")}>
               Message me
             </Button>;
    } else if(getUsername() === form.username) {
      return <Button variant="primary" size="lg" href="/profile/edit">Edit</Button>
    } else {
      return <Button variant="primary" size="lg" href="/profile/edit">Edit -> Message me</Button>
    }
  }

  return (
    <div>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row className="mb-3">
          <Col>
            <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" roundedCircle className="profile-photo"/>
            <div>
              {renderEditOrMessageButton()}
            </div>
          </Col>
          <Col>
            <Row className="mb-3" id="user-name">
              <h1 className="user-name">{form.firstName}{' '}{form.lastName}</h1>
            </Row>
            <Row className="mb-3" id="user-description">
              <h2 className="user-description">Description:</h2>
            </Row>
            <Row className="mb-3">
              <p className="text-start">{form.description}</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReviewSummary />
          </Col>
          <Col>
            <Reviews />
          </Col>
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
    </div>
  )
}

export default Profile;