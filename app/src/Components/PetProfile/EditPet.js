import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddPhotosPortal from "./AddPhotosPortal";
import Image from "react-bootstrap/Image";

function EditPet({ thisPet, setIsEdit, setThisPet, refetchPet }) {
  const [openPortal, setOpenPortal] = useState(false);
  const [newPhotos, setNewPhotos] = useState([]);
  const [petAttributes, setPetAttributes] = useState({
    name: thisPet.name,
    location: thisPet.location,
    type: thisPet.type,
    description: thisPet.description,
    age: thisPet.age,
    weight: thisPet.weight,
    reproductiveStatus: thisPet.reproductiveStatus,
    reported: thisPet.reported,
    coverPhoto: thisPet.coverPhoto,
  });
  console.log(petAttributes);

  function handleOnChange(e) {
    // console.log(e.target.type);
    if (e.target.type == "number")
      setPetAttributes({
        ...petAttributes,
        [e.target.name]: parseInt(e.target.value),
      });
    else if (e.target.type == "checkbox") {
      console.log(e);
      setPetAttributes({
        ...petAttributes,
        [e.target.name]: e.target.checked,
      });
    } else {
      setPetAttributes({
        ...petAttributes,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (photos.length == 0) {
      alert("At least one photo is required to upload");
    } else {
    fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com/:8080/api/pets/${thisPet.petId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petAttributes),
    })
      .then((r) => r.json())
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setIsEdit(false);
        setThisPet(data);
      });
    }
  }

  function handleDelete(e, i) {
    if (e.target.value === petAttributes.coverPhoto) {
      alert("Must Select Different Cover Photo First Before Deletion");
    } else {
      document.getElementById(`${i}`).remove();
    }
  }
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Owner</Form.Label>
        <Form.Control
          name="owner"
          className="pet-owner-name"
          type="readOnly"
          value={thisPet.owner}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          className="pet-name"
          type="text"
          placeholder={thisPet.name}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Location</Form.Label>
        <Form.Control
          name="location"
          className="pet-name"
          type="text"
          placeholder={thisPet.location}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Type</Form.Label>
        <Form.Select
          name="type"
          className="pet-type"
          onChange={handleOnChange}
          defaultValue={thisPet.type}
        >
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
          name="description"
          className="pet-name"
          type="text"
          placeholder={thisPet.description}
          onChange={handleOnChange}
        />
      </Form.Group>

      <div style={{ display: "flex", width: 50, padding: 30 }}>
        {thisPet.photos.map((photo) => {
          return (
            <div id={photo.photoId}>
              <Image
                style={{ display: "block", width: 250, padding: 30 }}
                src={photo.photo_url}
                key={photo.photoId}
                roundedCircle
              />

              <Button
                onClick={(e) => handleDelete(e, photo.photoId)}
                value={photo.photo_url}
              >
                {" "}
                Delete
              </Button>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  name="coverPhoto"
                  value={photo.photo_url}
                  type="radio"
                  label="Cover Photo"
                  onClick={handleOnChange}
                  defaultChecked={thisPet.coverPhoto === photo.photo_url}
                />
              </Form.Group>
            </div>
          );
        })}

        <Button onClick={() => setOpenPortal(true)}> Add Photos</Button>
        <AddPhotosPortal
          refetchPet={refetchPet}
          openPortal={openPortal}
          setOpenPortal={setOpenPortal}
          petId={thisPet.petId}
          thisPet={thisPet}
        />
      </div>

      <h1>Additional Details</h1>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>
        <Form.Control
          name="age"
          className="pet-name"
          type="number"
          placeholder={thisPet.age}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          name="weight"
          className="pet-name"
          type="number"
          placeholder={thisPet.weight}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          name="reproductiveStatus"
          type="checkbox"
          label="Spayed / Neuterd"
          defaultChecked={thisPet.reproductiveStatus}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          name="reported"
          type="checkbox"
          label="Reported"
          defaultChecked={thisPet.reported}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          name="adopted"
          type="checkbox"
          label="Adopted"
          defaultChecked={thisPet.adopted}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Button type="submit" className="add-pet-button">
        Finish Editing
      </Button>
    </Form>
  );
}

export default EditPet;
