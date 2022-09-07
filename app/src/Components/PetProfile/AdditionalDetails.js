import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function AdditionalDetails({ petId }) {
  const [optionalPetFields, setOptionalPetFields] = useState({
    weight: null,
    age: null,
    reproduction: false,
  });

  function handleOnChange(e) {
    e.target.value == "on"
      ? setOptionalPetFields({
          ...optionalPetFields,
          reproduction: !optionalPetFields.reproduction,
        })
      : setOptionalPetFields({
          ...optionalPetFields,
          [e.target.name]: parseInt(e.target.value),
        });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(optionalPetFields);
    fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(optionalPetFields),
    })
      .then((r) => r.json())
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          name="weight"
          className="pet-name"
          type="number"
          placeholder="Pet's Weight"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>
        <Form.Control
          name="age"
          className="pet-age"
          type="number"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Control
          name="reproduction"
          className="pet-reproduction"
          onChange={(e) => console.log(e)}
        />
        <Form.Check
          type="checkbox"
          label="Spayed / Neuterd"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Button type="submit" className="add-pet-button">
        Add Additional details
      </Button>
    </Form>
  );
}

export default AdditionalDetails;
