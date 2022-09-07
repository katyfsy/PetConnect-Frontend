import '../../Pages/Profile.css'
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import getUser from '../UserProfile/DummyData';

function Header() {
  const [userIcon, setUserIcon] = useState({
    username: '',
    userPhoto: '',
    zipCode: ''
  });

  const [username, setUserName] = useState("");

  useEffect(() => {
    const result = getUser();
    setUserIcon(result);
    setUserName(localStorage.getItem('username'));
  },[])

  const renderNotification = () => {
    if (userIcon.zipCode === null || userIcon.zipCode === "") {
        return (
                  <OverlayTrigger
                    key="left"
                    placement="left"
                    overlay={
                      <Tooltip id={"tooltip-left"}>
                        You have a notification.
                      </Tooltip>
                    }
                  >
                    <sup><Badge pill bg="danger">!</Badge></sup>
                  </OverlayTrigger>
                  )}
                }

  const renderNotificationOnEdit = () => {
    if (userIcon.zipCode === null || userIcon.zipCode === "") {
        return (
                  <OverlayTrigger
                    key="left"
                    placement="left"
                    overlay={
                      <Tooltip id={"tooltip-left"}>
                        Please complete your profile.
                      </Tooltip>
                    }
                  >
                    <Badge pill bg="danger">!</Badge>
                  </OverlayTrigger>
                )}
            }

  function clearStorage(){
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    console.log("signed out");
  }

  if(username === "" || username === null) {
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
          <Navbar.Collapse align="right" className="justify-content-end" expand="lg">
            <NavDropdown align="end" className="w-25 p-3" title={
                      <div>
                        <Image src={userIcon.userPhoto} roundedCircle width="50"/>
                          {renderNotification()}
                      </div>} id="basic-nav-dropdown">
                  <NavDropdown.Item disabled>@{userIcon.username}</NavDropdown.Item>
                  <NavDropdown.Item href="/profile/edit">
                    Edit profile {renderNotificationOnEdit()}
                  </NavDropdown.Item>
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