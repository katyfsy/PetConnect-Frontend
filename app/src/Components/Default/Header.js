import '../../Pages/Profile.css'
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Image, NavDropdown, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
// import getUser from '../UserProfile/DummyData';
import { getBearerToken, getUser, clearStorage } from "../UserProfile/userInfo.js"



function Header() {
  const [userIcon, setUserIcon] = useState({
    username: '',
    userPhoto: '',
    zipCode: ''
  });
  const [username, setUserName] = useState("");

  useEffect(() => {
    const doGetUser = () => {
      axios.get(`http://a6740867e357340d391ac68d12435ca6-2060668428.us-west-2.elb.amazonaws.com/api/user/${getUser()}`,
      {headers: {
        'Authorization': getBearerToken()
      }})
        .then((res) => {
          let result = res.data;
          for(var key in result) {
            if(result[key] === null) {
              result[key] = "";
            }
            if(result.userPhoto === "") {
              result.userPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }
          }
          setUserIcon(result);
          setUserName(getUser());
        });
      }
      if(getBearerToken() !== null & getBearerToken() !== "") {
        doGetUser();
      }
    //local data fetch for development
    // const result = getUser();
    // setUserIcon(result);
    // setUserName(localStorage.getItem('username'));
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


  if(username === "" || username === null) {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand href="/" style={{height: "96px", paddingTop: "33px"}}>PET CONNECT</Navbar.Brand>
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
                        <Image src={userIcon.userPhoto} roundedCircle width="40" height="40"/>
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