import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPet from "./EditPet";
import Navigationbar from "../Default/Navbar";
import Header from "../Default/Header";

import Container from "react-bootstrap/Container";

function Pet() {
  const [thisPet, setThisPet] = useState({});
  let petId = useParams();
  // console.log(petId);

  useEffect(() => {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId.id}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error("errrrrrr");
        console.error(err);
      })
      .then((data) => {
        console.log(data);
        setThisPet(data);
      });

  }, []);
  // console.log("Pet Idddddd");
  // console.log(petId.id);
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <br />
        
        <div>Pet Information Goes Here </div>
        <p>Name: {thisPet.name}</p>
        <p>Owner: {thisPet.owner}</p>
        <p>Location: {thisPet.location}</p>
        <p>Type: {thisPet.type}</p>
        <p>Description: {thisPet.description}</p>

        <p>Weight: {thisPet.weight}</p>
        <p>Age: {thisPet.age}</p>
        <p>Reproductive Status: {thisPet.reproductiveStatus}</p>
      
        <p>Likes: {thisPet.favoriteCount}</p>
        <p>Reported?: {thisPet.reported}</p>
        <p>Adopted?: {thisPet.adopted}</p>
        <p>Name: {thisPet.name}</p>

        <br />
      </Container>
    </>
  );
}

export default Pet;
