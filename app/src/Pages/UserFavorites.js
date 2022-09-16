import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table, Card, ListGroup, Stack } from "react-bootstrap";
import User from "../Components/UserProfile/User";
import { useParams } from "react-router-dom";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";
import FavButton from "../Components/UserProfile/FavButton";

function UserFavorites() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const username = useParams().username;

  const getPetList = async (favoritesList) => {

    let petData = [];
    for (let petId of favoritesList) {
      await axios
        .get(
          `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId}`
        )
        .then((res) => {
          petData.push(res.data);
          console.log(petData);
          if(petData.length === favoritesList.length) {
            setData(petData);
          }
        })
    }
  };

  const getFavorites = () => {
    if (getUser() !== null) {
      axios
        .get(`${PSB_API_URL}/api/user/${getUser()}/favorites`, {
          headers: {
            Authorization: getBearerToken(),
          },
        })
        .then((res) => {
          setFavorites(res.data.favorites);
          getPetList(res.data.favorites);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const deleteFavor = (petId) => {
  }

  const PetCard = data.map((element) => {
    let adopted = element.adopted ? "Yes" : "No";
    let isFavor;
    if (favorites.includes(element.petId)) {
      isFavor = true;
    } else {
      isFavor = false;
    }
    return (
      <Card style={{ width: "18rem" }}>
        <FavButton petId={element.petId} isFavor={isFavor} />
        <Card.Img
          variant="top"
          src={element.coverPhoto}
          style={{ height: 200 }}
          onClick={() => handleClick()}
        />
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
          <h1>{getUser()} Favorite Pets</h1>
        </Row>
        <Row>{PetCard}</Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default UserFavorites;
