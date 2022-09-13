import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPet from "./EditPet";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Pet() {
  const [thisPet, setThisPet] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  let petId = useParams();
  console.log(petId);
  let isLoggedIn = localStorage.getItem("username") == null ? false : true;
  let user = localStorage.getItem("username");
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

  function handleOnDelete() {
    fetch(`http://localhost:8080/api/pets/${petId.id}`, { method: "DELETE" })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })
      .then((data) => {
        console.log(data);
      });
  }

  if (thisPet == null) {
    return null;
  }
  return (
    <>
      {user == thisPet.owner ? (
        <>
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <button onClick={handleOnDelete}>Delete</button>
        </>
      ) : null}
      <br />

      <Row className="mb-3">
        <Col>
          <Image
            src={thisPet.coverPhoto}
            roundedCircle
            className="profile-photo"
          />
          <div></div>
        </Col>
        <Col>
          <Row className="mb-3" id="user-name">
            <h1 className="pet-name">{thisPet.name}</h1>
            <p className="pet-location">{thisPet.location}</p>
          </Row>
          <Row className="mb-3" id="contact-pet-owner">
            <Button variant="primary" size="lg" href="/messages">
              Contact My Owner
            </Button>
            <p className="user-email">{form.email}</p>
          </Row>
          <Row className="mb-3" id="user-description">
            <h3 className="user-description">Description:</h3>
          </Row>
          <Row className="mb-3">
            <p className="text-start">{form.description}</p>
          </Row>
        </Col>
        <div>Pet Information Goes Here </div>
        {!isEdit ? (
          <>
            <p>Name: {thisPet.name}</p>
            <p>Owner: {thisPet.owner}</p>
            <p>Location: {thisPet.location}</p>
            <p>Type: {thisPet.type}</p>
            <p>Description: {thisPet.description}</p>

            <p>Weight: {thisPet.weight}</p>
            <p>Age: {thisPet.age}</p>
            <p>
              Reproductive Status:{" "}
              {thisPet.reproductiveStatus ? "No Kids" : "Yes Kids"}
            </p>

            <p>Likes: {thisPet.favoriteCount}</p>
            <p>Reported: {thisPet.reported ? "true" : "false"}</p>
            <p>Adopted: {thisPet.adopted ? "true" : "false"}</p>
          </>
        ) : (
          <EditPet
            thisPet={thisPet}
            setIsEdit={setIsEdit}
            setThisPet={setThisPet}
          />
        )}
      </Row>
      <br />
    </>
  );
}

export default Pet;
