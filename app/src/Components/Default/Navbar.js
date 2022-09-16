import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUser } from "../UserProfile/psb-exports";

function Navigationbar() {

  const isLoggedIn = () => {
    if(getUser() === "" || getUser() === null) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Navbar expand="lg" className="navBar" style={{paddingTop: 0, backgroundColor: "#8F9ED9", marginBottom: 10}}>
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn() ? <Nav.Link href="/myprofile" style={{color: "white"}}>MyProfile</Nav.Link> : null}
            <Nav.Link href="/pets" style={{color: "white"}}>Pets</Nav.Link>
            <Nav.Link href="/messages" style={{color: "white"}}>Messages</Nav.Link>
            <Nav.Link href="/directory" style={{color: "white"}}>Directory</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;