import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pet from "./Pet";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../Default/Header";
import Navigationbar from "../Default/Navbar";

function AddAPetFormFunctional() {
  const [petId, setPetId] = useState(null);
  const [requiredPetFields, setrequiredPetFields] = useState({
    owner: "",
    name: null,
    location: null,
    type: null,
    description: null,
  });
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  function handleOnChange(e) {
    setrequiredPetFields({
      ...requiredPetFields,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(requiredPetFields);
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requiredPetFields),
      }
    )
      .then((r) => r.json())
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data);
        setPetId(data.petId);
        setIsClicked(true);
        navigateToPetProfile(data.petId);
      });
  }

  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    navigate(`/pet/${id}`, { replace: true });
  };
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              name="owner"
              className="pet-owner-name"
              type="text"
              placeholder="Pet's Owner's Name"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              className="pet-name"
              type="text"
              placeholder="Pet's Name"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              className="pet-location"
              type="text"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              className="pet-type"
              onChange={handleOnChange}
            >
              <option>Please Select from the list below</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="horse">Horse</option>
              <option value="fish">Fish</option>
              <option value="farmAnimal">Farm Animal</option>
              <option value="smallPet">Small Pet</option>
              <option value="reptile">Reptile</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="petDescription"
              name="description"
              as="textarea"
              onChange={handleOnChange}
            />
          </Form.Group>

          {isClicked ? null : (
            <Button
              type="submit"
              className="add-pet-button"
            >
              Add Pet
            </Button>
          )}
          <br />
          <br />
          <Button type="submit" onClick={() => navigate(-1)}>
            {" "}
            Go Back{" "}
          </Button>
        </Form>

        <br />
        {isClicked ? <Pet requiredPetFields={requiredPetFields} /> : null}
      </Container>
    </>
  );
}

export default AddAPetFormFunctional;
