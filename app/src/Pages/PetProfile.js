import React from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Pet from "../Components/PetProfile/Pet";
import Container from "react-bootstrap/Container";


function AddAPet() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Pet />
      </Container>
    </>
  );
}

export default AddAPet;
