import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUser } from "../UserProfile/psb-exports"

function Navigationbar() {

  const isLoggedIn = () => {
    if(getUser() === "" || getUser() === null) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn() ? <Nav.Link href="/myprofile">MyProfile</Nav.Link> : null}
            <Nav.Link href="/pets">Pets</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
            <Nav.Link href="/directory">Directory</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;