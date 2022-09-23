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
            <h5 id="ascent">Ascent Technical Program</h5>
          </Col>
          <Col>
            <h4>Pet Shop Boys</h4>
            <Image src={require("./HeaderPics/psb-logo.png")} id="psb-image"/>
            <p id="developer-name">Kun Chen</p>
            <p id="developer-name">Lucas Bonner</p>
            <p id="developer-name">Varun Srinivasan</p>
            <p id="developer-name">Vincent Le</p>
          </Col>
            <Col>
              <h4>Pet Detectives</h4>
              <Image src={require("./HeaderPics/pd-logo.png")} id="pd-image"/>
              <p id="developer-name">Katy Feng</p>
              <p id="developer-name">Marilene Soares da Costa</p>
              <p id="developer-name">Meredith White</p>
              <p id="developer-name">Trevor Leung</p>
          </Col>
          <Col>
            <h4>Pet Posse</h4>
            <Image src={require("./HeaderPics/pp-logo.png")} id="pp-image"/>
            <p id="developer-name">Benis Tambe</p>
            <p id="developer-name">Carlos Morales</p>
            <p id="developer-name">Edward Pak</p>
            <p id="developer-name">Enriqueta De Leon</p>
            <p id="developer-name">Luis Escobar</p>
          </Col>
          <Col>
            <h4>Pet Meets Family</h4>
            <Image src={require("./HeaderPics/PMF-logo.png")} id="pmf-image"/>
            <p id="developer-name">Ginwoo Pak</p>
            <p id="developer-name">Ivy Wong</p>
            <p id="developer-name">Rick Kunz</p>
            <p id="developer-name">Yu Zhang</p>
          </Col>
          </Row>
        </Container>
    </div>


  )
}

export default Footer;