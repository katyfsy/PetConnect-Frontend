import React, { useState, useEffect } from "react";
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
import { getUser } from "../UserProfile/psb-exports";;
function AddAPetForm() {
  const [petId, setPetId] = useState(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  // const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(0);

  let user = getUser();;
  console.log(user);
  const [requiredPetFields, setrequiredPetFields] = useState({
    owner: user.toString(),
    name: null,
    zip: null,
    type: null,
    sex: null,
    description: null,
  });
  console.log(requiredPetFields);
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
    // let filesProgress = [];
    // filesProgress.push(progress)
    // setFilesProgress(filesProgress)
    // setProgress(0)

    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        setCurrentUpload(i)
        let options = {
          headers: {
            "Content-Type": photos[i].type,
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress)
          },
          // onDownloadProgress: (progressEvent) => {
          //   const progress = 50 + (progresssEvent.loaded / progressEvent.total) * 100;
          //   console.log("THIS IS THE PROGRESSS: ", progress);
          //   setProgress(progress);
          // }
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

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

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
    setValidated(true);
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
            <h3>Let's create the pet's profile</h3>
            <br />
            <Form
              noValidate
              validated={validated}
              onSubmit={handleOnSubmit}
              id="add-pet-form"
            >
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
                    defaultValue={getUser()}
                    disabled={true}
                    className="pet-owner-name"
                  />
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="validateName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  name="name"
                  className="pet-name"
                  type="text"
                  placeholder="Pet's Name"
                  onChange={handleOnChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter your pet's name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validateZip">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  required
                  name="zip"
                  className="pet-zip"
                  type="number"
                  onChange={handleOnChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a zipcode.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validateType">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="type"
                  className="pet-type"
                  onChange={handleOnChange}
                >
                  {/* <option>Please Select from the list below</option> */}
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
              <Form.Group className="mb-3" controlId="validateSex">
                <Form.Label>Sex</Form.Label>
                <Form.Select
                  name="sex"
                  className="pet-sex"
                  onChange={handleOnChange}
                >
                  {/* <option>Please Select from the list below</option> */}
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validateDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  className="petDescription"
                  name="description"
                  as="textarea"
                  onChange={handleOnChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Tell us a little more about your pet.
                </Form.Control.Feedback>
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
                  progress={progress}
                  currentUpload={currentUpload}
                />
              </div>

              <br />
              <Row>
                <Col>
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={() => navigate(-1)}
                  >
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

export default AddAPetForm;
