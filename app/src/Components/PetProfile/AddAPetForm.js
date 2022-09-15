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
import { getUser } from "../UserProfile/psb-exports"


function AddAPetFormFunctional() {
  const [petId, setPetId] = useState(null);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  let user = getUser()
  console.log(user);
  const [requiredPetFields, setrequiredPetFields] = useState({
    owner: user.toString(),
    name: null,
    zip: null,
    type: null,
    sex: null,
    description: null,
  });
  const MAX_NUMBER_OF_PHOTOS = 5;
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
      fileData.petId = petId;
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
      if (petId != null) {
        await handleUpload(petId);
        navigateToPetProfile(petId);
      }

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
                {getUser() == "" ? (
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
                    value={getUser()}
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
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  name="zip"
                  className="pet-zip"
                  type="number"
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
                <Form.Label>Sex</Form.Label>
                <Form.Select
                  name="sex"
                  className="pet-sex"
                  onChange={handleOnChange}
                >
                  <option>Please Select from the list below</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
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
              showRadios={true}
              maxPhotos={MAX_NUMBER_OF_PHOTOS}
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
