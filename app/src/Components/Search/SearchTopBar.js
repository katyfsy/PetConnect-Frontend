import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import './Default/DefaultComponents.css'


function SearchTopBar({searchQuery, radius, setRadius, zipcode}) {

  const handleRadiusSelect = (e) => {
    setRadius(e.target.value);
  }

  return(
    <Navbar style={{backgroundColor: "#8F9ED9", borderColor: "#FBE8A6"}}>
      <Container className="justify-content-start">
        <Navbar.Brand className="navBar">Here's your search for</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="justify-content-start">
          <Navbar.Text style={{paddingRight:10}}>{searchQuery}</Navbar.Text>
          <Navbar.Text style={{paddingRight:10}}>within</Navbar.Text>
          <Form className="d-flex">
            <Form.Select aria-label="Default select example" onChange={e => handleRadiusSelect(e)}>
              <option value="10">10 miles</option>
              <option value="15">15 miles</option>
              <option value="20">20 miles</option>
            </Form.Select>
          </Form>
          {zipcode.length === 0 ? (<Navbar.Text style={{paddingLeft:10}}>Anywhere</Navbar.Text>) : (<Navbar.Text style={{paddingLeft:10}}>near {zipcode}</Navbar.Text>)}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default SearchTopBar;