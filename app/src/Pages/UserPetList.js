import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table, Card, ListGroup } from "react-bootstrap";
import User from "../Components/UserProfile/User";
import { useParams } from "react-router-dom";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";

function UserPetList() {
  const [data, setData] = useState([]);

  const username = useParams().username;
  // const username = "testuser"

  const getData = async () => {
    const { data } = await axios.get(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets?owner=${username}`);
    console.log(data.petsList)
    setData(data.petsList);
  };
  useEffect(() => {
    getData();
  }, []);

  const PetCard = data.map((element) => {
    let adopted = element.adopted ? "Yes" : "No"

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={element.coverPhoto} style={{height: 200}} onClick={() => handleClick()}/>
      <Card.Body>
        <Card.Title>{element.name}</Card.Title>
        <Card.Text>{element.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Adopted: {adopted}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="">Our website</Card.Link>
      </Card.Body>
      </Card>
    );
  });
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Row>
          <h1>{username}'s Pet List</h1>
          {PetCard}
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default UserPetList;
