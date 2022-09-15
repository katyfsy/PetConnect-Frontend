import '../../Pages/Profile.css'
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Image, NavDropdown, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { getBearerToken, getUser, clearStorage, PSB_API_URL, getUserType } from "../UserProfile/psb-exports"

function Header() {
  const [userIcon, setUserIcon] = useState({
    username: '',
    userPhoto: '',
    zipCode: ''
  });
  const [username, setUserName] = useState("");

  const setUserType = (userType) => {
    if (localStorage.getItem("token") === null){
      sessionStorage.setItem("userType", userType)
    } else {
      localStorage.setItem("userType", userType)
    }
  }

  useEffect(() => {
    const doGetUser = () => {
      axios.get(`${PSB_API_URL}/api/user/${getUser()}`,
      {headers: {
        'Authorization': getBearerToken()
      }})
        .then((res) => {
          setUserType(res.data.userType);
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
      <Navbar style={{backgroundColor: "#F4976C"}}>
        <Container>
          <Navbar.Brand href="/" style={{height: "96px", paddingTop: "33px", color: "white"}}>PET CONNECT</Navbar.Brand>
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
      <Navbar style={{backgroundColor: "#F4976C"}}>
        <Container>
          <Navbar.Brand href="/" style={{height: "96px", paddingTop: "33px", color: "white"}}>PET CONNECT</Navbar.Brand>
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