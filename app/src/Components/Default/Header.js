import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import getUser from '../UserProfile/DummyData';

function Header() {
  const [userIcon, setUserIcon] = useState({
    username: '',
    userPhoto: '',
    zipCode: ''
  });

  useEffect(() => {
    const result = getUser();
    setUserIcon(result);
  },[])

  const renderNotification = () => {
    if (userIcon.zipCode === null || userIcon.zipCode === "") {
        return <Badge pill bg="danger" style={{position:"absolute", top:"0px", left:"40px"}}>1</Badge>
      }
  }

  const renderNotificationOnEdit = () => {
    if (userIcon.zipCode === null || userIcon.zipCode === "") {
        return <Badge pill bg="danger">1</Badge>
      }
  }

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
            <NavDropdown className="justify-content-end" title={
                      <div>
                        <Image src={userIcon.userPhoto} roundedCircle width="50"/>
                        {renderNotification()}
                      </div>} id="basic-nav-dropdown">
                  <NavDropdown.Item disabled>@{userIcon.username}</NavDropdown.Item>
                  <NavDropdown.Item href="/profile/edit">Edit profile {renderNotificationOnEdit()}</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={clearStorage}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;