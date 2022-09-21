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
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/1280px-Vmware.svg.png" style={{height:60, width:200}}/>
          </Col>
          <Col style={{color: "white"}}>
          <h3>Developer</h3>
          <p>Benis Tambe, Carlos Morales, Edward Pak, Enriqueta De Leon, </p>
          <p>Ginwoo Pak, Ivy Wong, Katy Feng, Kun Chen, Lucas Bonner, </p>
          <p>Luis Escobar, Marilene Soares da Costa, Meredith White,</p>
          <p>Rick Kunz, Trevor Leung, Varun Srinivasan, Vincent Le, Yu Zhang</p>
          </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Footer;