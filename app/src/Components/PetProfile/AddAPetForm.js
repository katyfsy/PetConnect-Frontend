import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pet from "./Pet";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AddAPetForm.css";
import Photos from "./Photos";
import axios from "axios";

function AddAPetFormFunctional() {
  const [petId, setPetId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(0);
  let user = localStorage.getItem("username");
  console.log(user);
  const [requiredPetFields, setrequiredPetFields] = useState({
    owner: user.toString(),
    name: null,
    location: null,
    type: null,
    description: null,
  });
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setrequiredPetFields({
      ...requiredPetFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPhotos = (newPhotos) => {
    setPhotos([...photos, ...newPhotos]);
  };

  const handleRemovePhotos = (photos) => {
    setPhotos(photos);
  };

  const handleCoverPhoto = (selection) => {
    setCoverPhoto(selection);
  };

  const createPet = () => {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .post(
        `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets`,
        JSON.stringify(requiredPetFields),
        options
      )
      .then((res) => {
        setPetId(res.data.petId)
        return res.data.petId;
      })
      .catch((err) => console.log(err));
  };

  const getPresignedUrls = (files) => {
    return axios
      .post(
        "http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/uploadAuth",
        files
      )
      .then((res) => {
        return res.data;
      });
  };

  const extractFileData = (petId) => {
    let files = [];
    for (let i = 0; i < photos.length; i++) {
      let fileData = {};
      fileData.petId = petId.toString();
      fileData.filename = photos[i].name;
      fileData.filetype = photos[i].type;
      files.push(fileData);
    }
    return files;
  };

  const handleUpload = async (petId) => {
    let files = extractFileData(petId);
    console.log(files);
    let urls = await getPresignedUrls(files);

    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        let options = {
          headers: {
            "Content-Type": photos[i].type,
          },
        };
        await axios
          .put(urls[i], photos[i], options)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      alert("Photos uploaded successfully");
      await axios
        .post(
          `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/persist?petId=${petId}&coverPhoto=${photos[coverPhoto].name}`
        )
        .then((res) => console.log(res))
        .then((res) => alert("PERSISTED"))
        .catch((err) => console.log(err));
    } else {
      alert("At least one photo is required to upload");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (photos.length == 0) {
      alert("At least one photo is required to upload");
    } else {
      let petId = await createPet();
      // console.log("THIS IS THE PETID: ", petId);
      await handleUpload(petId);
      navigateToPetProfile(petId);
    }
  };

  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    navigate(`/pet/${id}`, { replace: true });
  };
  return (
    <>
      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col style={{ width: "60%" }}>
            <Form onSubmit={handleOnSubmit} id="add-pet-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Owner</Form.Label>
                {localStorage.getItem("username") == "" ? (
                  <Form.Control
                    name="owner"
                    className="pet-owner-name"
                    type="text"
                    placeholder="Pet's Owner's Name"
                    onChange={handleOnChange}
                  />
                ) : (
                  <Form.Control
                    name="owner"
                    value={localStorage.getItem("username")}
                    className="pet-owner-name"
                    type="text"
                    placeholder="Pet's Owner's Name"
                    onChange={handleOnChange}
                  />
                )}
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
              <div>
                <Photos
                  photos={photos}
                  coverPhoto={coverPhoto}
                  handleAddPhotos={handleAddPhotos}
                  handleRemovePhotos={handleRemovePhotos}
                  handleCoverPhoto={handleCoverPhoto}
                />
              </div>

              <br />
              <Row>
                <Col>
                <Button variant="secondary" type="submit" onClick={() => navigate(-1)}>
                  {"<"} Go Back
                </Button>
                </Col>
                <Col>
                {isClicked ? null : (
                  <Button type="submit" className="add-pet-button">
                    Add Pet
                  </Button>
                )}
                </Col>
              </Row>
            </Form>

            <br />
            {isClicked ? <Pet requiredPetFields={requiredPetFields} /> : null}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default AddAPetFormFunctional;
