import React from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import PetList from "../Components/PetProfile/PetList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddPetButton from "../Components/PetProfile/AddPetButton";

function Pets() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Col>
          <Row
            className="justify-content-md-center"
            style={{ "padding-top": "50px" }}
          >
            <AddPetButton />
          </Row>
        </Col>
        <Row
          className="justify-content-md-center"
          style={{ "padding-top": "50px" }}
        >
          <Col>
            <PetList />
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ "padding-top": "50px" }}
        ></Row>
        {/* <Row>
          <Footer />
        </Row> */}
      </Container>
    </>
  );
}

export default Pets;
