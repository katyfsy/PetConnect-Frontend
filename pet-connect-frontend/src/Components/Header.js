import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header() {
    return (
        <Navbar>
          <Container>
            <Navbar.Brand href="/">PET CONNECT</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Button variant="light">Login</Button>
                <Button variant="light">Signup</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Header;