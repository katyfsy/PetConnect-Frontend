import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUser } from "../UserProfile/psb-exports"
import axios from 'axios'
import { AiFillMessage } from 'react-icons/ai';
import { useLocation } from "react-router-dom";

function Navigationbar() {

  const isLoggedIn = () => {
    if (getUser() === "" || getUser() === null) {
      return false;
    } else {
      return true;
    }
  }

  const username = getUser()
  const [notification, setNotification] = useState(false)
  const location = useLocation();

  if (username && location.pathname !== '/messages') {
    useEffect(() => {
      const id = setInterval(() =>
        axios
          .get(
            `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${username}`
          )
          // axios.get(`http://localhost:8080/messages/notifications/${username}`)
          .then((response) => {
            setNotification(response.data.length ? true : false);
          })
          .catch((err) => {
            console.log(err);
          }), 5000);
      return () => clearInterval(id);
    }, []);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn() ? <Nav.Link href="/myprofile">MyProfile</Nav.Link> : null}
            <Nav.Link href="/pets">Pets</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
            {notification ? <AiFillMessage size={30} color={'red'} /> : null}
            <NavDropdown className="justify-content-end" title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;