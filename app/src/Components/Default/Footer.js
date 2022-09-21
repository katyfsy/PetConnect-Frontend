import React from 'react';
import { Container, Row, Col, Image, Navbar } from 'react-bootstrap';
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
        <Container>
          <Row>
          <Col>
          <h3 style={{color: "white"}}>Sponsored by</h3>
            <Image className="footerImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/1280px-Vmware.svg.png" />
            <h4>Ascent Technical Program</h4>
          </Col>
          <Col>
          <p> Team name</p>
          <p>Benis Tambe, Carlos Morales, Edward Pak, Enriqueta De Leon, </p></Col>
          <Col>
          <p>Ginwoo Pak, Ivy Wong, Katy Feng, Kun Chen, Lucas Bonner, </p></Col>
          <Col>
          <p>Luis Escobar, Marilene Soares da Costa, Meredith White,</p></Col>
          <Col>
          <p>Rick Kunz, Trevor Leung, Varun Srinivasan, Vincent Le, Yu Zhang</p></Col>
          </Row>
        </Container>
    </div>


  )
}

export default Footer;