import React from 'react';
import { Container, Row, Col, Image, Navbar } from 'react-bootstrap';
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
        <Container>
          <Row>
          <Col className="firstCol">
          <h3 className="footerTitle">Sponsored by</h3>
            <Image className="footerImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/1280px-Vmware.svg.png" />
            <h5 id="ascent">Ascent Technical Program</h5>
          </Col>
          <Col>
            {/* <h4>Pet Shop Boys</h4> */}
            <Image src={require("./HeaderPics/psb-logo_ps.png")} id="psb-image"/>
            <p>Kun Chen</p>
            <p>Lucas Bonner</p>
            <p>Varun Srinivasan</p>
            <p>Vincent Le</p>
          </Col>
            <Col>
              {/* <h4>Pet Detectives</h4> */}
              <Image src={require("./HeaderPics/pd-logo.png")} id="pd-image"/>
              <p>Katy Feng</p>
              <p>Marilene Soares da Costa</p>
              <p>Meredith White</p>
              <p>Trevor Leung</p>
          </Col>
          <Col>
            {/* <h4>Pet Posse</h4> */}
            <Image src={require("./HeaderPics/pp-logo_ps.png")} id="pp-image"/>
            <p>Benis Tambe</p>
            <p>Carlos Morales</p>
            <p>Edward Pak</p>
            <p>Enriqueta De Leon</p>
            <p>Luis Escobar</p>
          </Col>
          <Col>
            {/* <h4>Pet Meets Family</h4> */}
            <Image src={require("./HeaderPics/PMF-logo_ps.png")} id="pmf-image"/>
            <p>Ginwoo Pak</p>
            <p>Ivy Wong</p>
            <p>Rick Kunz</p>
            <p>Yu Zhang</p>
          </Col>
          </Row>
        </Container>
    </div>


  )
}

export default Footer;