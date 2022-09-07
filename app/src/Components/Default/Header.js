import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import { useNavigate } from 'react-router-dom';
import getUser from '../UserProfile/DummyData';

function Header() {
  const [userIcon, setUserIcon] = useState({
    username: '',
    userPhoto: '',
    zipCode: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const result = getUser();
    setUserIcon(result);
    // redirect user to edit profile page if user haven't complete profile
    if (result.zipCode === null || result.zipCode === "") {
      navigate("/profile/edit");
    }
  },[])

  function clearStorage(){
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    console.log("signed out");
  }

  if(localStorage.getItem('username') === "" || localStorage.getItem('username') === null) {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand href="/">PET CONNECT</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
              <Button href='/login' variant="light">Login</Button>
              <Button href='/signup' variant="light">Signup</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand href="/">PET CONNECT</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end" expand="lg">
            <Image src={userIcon.userPhoto} roundedCircle width="50"/>
            <Navbar.Text>
              {" "} Signed in as: {userIcon.username}
            </Navbar.Text>
            <Button href="/" variant="light" onClick={clearStorage}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;