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