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

          <Col className="teamCol">
            {/* <h4>Pet Shop Boys</h4> */}
            <Image src={require("./HeaderPics/psb-logo_ps.png")} id="psb-image"/>
            <ul className="teamMembers">
              <li>Kun Chen</li>
              <li>Lucas Bonner</li>
              <li>Varun Srinivasan</li>
              <li>Vincent Le</li>
            </ul>
          </Col>
            <Col  className="teamCol">
              {/* <h4>Pet Detectives</h4> */}
              <Image src={require("./HeaderPics/pd-logo.png")} id="pd-image"/>
              <ul className="teamMembers">
              <li>Katy Feng</li>
              <li>Marilene Soares da Costa</li>
              <li>Meredith White</li>
              <li>Trevor Leung</li>
            </ul>

          </Col>
          <Col  className="teamCol">
            {/* <h4>Pet Posse</h4> */}
            <Image src={require("./HeaderPics/pp-logo_ps.png")} id="pp-image"/>
            <ul className="teamMembers">
              <li>Benis Tambe</li>
              <li>Carlos Morales</li>
              <li>Edward Pak</li>
              <li>Enriqueta De Leon</li>
              <li>Luis Escobar</li>
            </ul>

          </Col>
          <Col  className="teamCol">
            {/* <h4>Pet Meets Family</h4> */}
            <Image src={require("./HeaderPics/PMF-logo_ps.png")} id="pmf-image"/>
            <ul className="teamMembers">
              <li>Ginwoo Pak</li>
              <li>Ivy Wong</li>
              <li>Rick Kunz</li>
              <li>Yu Zhang</li>
            </ul>
          </Col>
          </Row>
        </Container>
    </div>


  )
}

export default Footer;