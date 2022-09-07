import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import Navigationbar from '../Default/Navbar';
import Header from '../Default/Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Pet() {

  const [thisPet, setThisPet] = useState(null);
  let petId = useParams();
  console.log(petId)

  useEffect(() => {
    fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId}`)
    .then((res) => res.json())
    // .catch((err) => {
    //   console.error(err);
    // })
    .then((data) => {
      console.log(data);
      setThisPet(data);
    })

  })

  return (
    <>
    <Container>
      <Header/>
    </Container>
    <Navigationbar/>
    <Container></Container>
    <br />

    <div>pet goes here {thisPet}</div>
    <br  />
    </>
      
  )
}

export default Pet;