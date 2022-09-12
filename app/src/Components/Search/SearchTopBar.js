import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function SearchTopBar({searchQuery}) {
  return(
    <Navbar>
      <Container className="justify-content-start">
        <Navbar.Brand>Here's your search for</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="justify-content-start">
          <Navbar.Text style={{paddingRight:10}}>{searchQuery}</Navbar.Text>
          <Navbar.Text style={{paddingRight:10}}>within</Navbar.Text>
          <Form className="d-flex">
            <Form.Select aria-label="Default select example">
              <option value="10">10 miles</option>
              <option value="15">15 miles</option>
              <option value="20">20 miles</option>
            </Form.Select>
          </Form>
          <Nav.Link>near 94704</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default SearchTopBar;