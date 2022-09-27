import React, { useState, useEffect } from "react";
import { FloatingLabel, Button, Form, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Modal from 'react-bootstrap/Modal';
import Pet from "./Pet";
import { useNavigate } from "react-router-dom";
import "./AddAPetForm.css";
import Photos from "./Photos";
import Alert from "./AlertModalPetForms";
import axios from "axios";
import { getUser } from "../UserProfile/psb-exports";

function AddAPetForm() {
  const [petId, setPetId] = useState(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [handleOnExited, setHandleOnExited] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(0);

  const [nonRequiredPetFields, setNonRequiredPetFields] = useState({
    state: null,
    city: null,
    breed: null,
    species: null,
    size: null,
    age: null,
    reproductiveStatus: null,
  });

  let onExited = null;
  let user = getUser();
  console.log(user);
  const [requiredPetFields, setrequiredPetFields] = useState({
    owner: user.toString(),
    name: null,
    zip: null,
    type: null,
    sex: null,

    description: null,
  });
  console.log(photos);
  const MAX_NUMBER_OF_PHOTOS = 5;

  const handleOnChange = (e, form, setform) => {
      setform({
        ...form,
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
        setCurrentUpload(i);
        let options = {
          headers: {
            "Content-Type": photos[i].type,
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress);
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
      // alert("Photos uploaded successfully");
      await axios
        .post(
          `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/persist?petId=${petId}&coverPhoto=${photos[coverPhoto].name}`
        )
        .then((res) => console.log(res))
        .then((res) => {
          setShowAlert(true);
          setAlertTitle("Congratulations");
          setAlertText("Pet profile created successfully");
          setAlertType("success");
          setHandleOnExited(true);
        })
        .catch((err) => console.log(err));
    } else {
      setShowAlert(true);
      setAlertTitle("Photo requirements not met");
      setAlertText("Pet profiles require at least one photo");
      setAlertType("error");
      setHandleOnExited(false);
    }
  };
  function handlePatch(petId) {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nonRequiredPetFields),
      }
    )
      .then((r) => r.json())
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data);
      });
  }
  const handleOnSubmit = async () => {
    // const form = e.currentTarget;

    // if (isValid === false ) {
    //   console.log('isvalid exists')
    // }

    // if (form.checkValidity() === true) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   setShowAlert(true)
    //   setAlertTitle("Incomplete form")
    //   setAlertText("Fill out required fields")
    //   setAlertType("error")
    //   setHandleOnExited(false)
    // } else {

    // e.preventDefault();

    let petId = await createPet();
    if (petId != null) {
      setPetId(petId);
      await handlePatch(petId);
      await handleUpload(petId);
    }

    // setValidated(true);

    // if (photos.length == 0) {
    //   setShowAlert(true)
    //   setAlertTitle("")
    //   setAlertText("Pet profiles require at least one photo")
    //   setAlertType("error")
    //   setValidated(false)
    //   // alert("At least one photo is required to upload");
    // } else {
    //   let petId = await createPet();
    //   if (petId != null) {
    //     setPetId(petId)
    //     await handleUpload(petId);
    //   }
    //   // setValidated(true);
    // }
    // setValidated(true);
  };

  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    navigate(`/pet/${id}`, { replace: true });
  };

  const schema = Yup.object({
    name: Yup.string().required("pet name is required"),
    city: Yup.string(),
    state: Yup.string().min(2, "minimum of 2 characters"),
    zip: Yup.number()
      .required("zipcode is required")
      .test(
        "len",
        "Must be exactly 5 numbers",
        (val) => val && val.toString().length === 5
      ),
    type: Yup.string().required("type is required"),
    breed: Yup.string(),
    species: Yup.string(),
    size: Yup.string(),
    sex: Yup.string().required("sex is required"),
    age: Yup.string(),
    description: Yup.string()
      .min(20, "minimum of 20 characters")
      .required("description is required"),
  });

  console.log("NON REQUIRED: ", nonRequiredPetFields);
  console.log("REQUIRED: ", requiredPetFields);

  return (
    <>
      <Container className="addpet-form-container">
        <h3>Tell us more about your pet</h3>
        <br />
        <Formik
          validationSchema={schema}
          // validateOnMount
          // setSubmitting={false}
          onSubmit={handleOnSubmit}
          // validateOnChange={false}
          // validateOnBlur={true}
          // setTouched={false}
          initialValues={{
            name: "",
            city: "",
            state: "",
            zip: "",
            type: "",
            breed: "",
            species: "",
            size: "",
            age: "",
            sex: "",
            reproductiveStatus: "",
            description: "",
            // photos: "",
          }}
          // validate
          // errors={{
          //   name: "",
          //   city: "",
          //   state: "",
          //   zip: "",
          //   type: "",
          //   sex: "",
          //   description: "",
          //   // photos: "",
          // }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              className="addpet-form"
              onSubmit={(e) => {
                if (isValid === false) {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAlert(true);
                  setAlertTitle("Incomplete form");
                  setAlertText("Fill out required fields");
                  setAlertType("error");
                  setHandleOnExited(false);
                } else {
                  handleSubmit(e);
                }
              }}
            >
              <Form.Group
                className="mb-3 form-fields"
                controlId="owner-validation"
              >
                <Form.Label>Owner</Form.Label>
                {getUser() != "" ? (
                  <Form.Control
                    className="pet-owner-name form-input"
                    name="owner"
                    defaultValue={getUser()}
                    disabled={true}
                  />
                ) : (
                  <></>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3 form-fields"
                controlId="name-validation"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="pet-name form-input"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e, requiredPetFields, setrequiredPetFields);
                  }}
                  placeholder="Pet's name"
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="mb-3 form-fields"
                controlId="city-validation"
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="pet-city form-input"
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(
                      e,
                      nonRequiredPetFields,
                      setNonRequiredPetFields
                    );
                  }}
                  placeholder="City"
                  isInvalid={errors.city}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="addpet-form-section">
                <Form.Group
                  className="mb-3 form-fields-2-row"
                  controlId="zip-validation"
                >
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    className="pet-state form-input"
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        nonRequiredPetFields,
                        setNonRequiredPetFields
                      );
                    }}
                    placeholder="State"
                    isInvalid={errors.state}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-fields-2-row"
                  controlId="zipValidation"
                >
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    className="pet-zip form-input"
                    type="number"
                    name="zip"
                    value={values.zip}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        requiredPetFields,
                        setrequiredPetFields
                      );
                    }}
                    placeholder="Zipcode"
                    isInvalid={errors.zip}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="addpet-form-section form-input">
                <Form.Group
                  className="mb-3 form-fields-2-row"
                  controlId="type-validation"
                >
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    className="pet-type form-input"
                    type="text"
                    name="type"
                    value={values.type}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        requiredPetFields,
                        setrequiredPetFields
                      );
                    }}
                    isInvalid={errors.type}
                  >
                    <option value="">Select type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="horse">Horse</option>
                    <option value="fish">Fish</option>
                    <option value="farmAnimal">Farm Animal</option>
                    <option value="smallPet">Small Pet</option>
                    <option value="reptile">Reptile</option>
                  </Form.Select>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.type}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-fields-2-row"
                  controlId="breed-species-validation"
                >
                  <Form.Label>
                    {values.type === "dog" || values.type === "cat"
                      ? "Breed"
                      : "Species"}
                  </Form.Label>
                  <Form.Control
                    className="pet-breed-species form-input"
                    type="text"
                    name={
                      values.type === "dog" || values.type === "cat"
                        ? "breed"
                        : "species"
                    }
                    value={
                      values.type === "dog" || values.type === "cat"
                        ? values.breed
                        : values.species
                    }
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        nonRequiredPetFields,
                        setNonRequiredPetFields
                      );
                    }}
                    placeholder={
                      values.type === "dog" || values.type === "cat"
                        ? "Breed"
                        : "Species"
                    }
                    isInvalid={
                      values.type === "dog" || values.type === "cat"
                        ? errors.breed
                        : errors.species
                    }
                    disabled={values.type === "" ? true : false}
                  />
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {values.type === "dog" || values.type === "cat"
                      ? errors.breed
                      : errors.species}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="addpet-form-section">
                <Form.Group
                  className="mb-3 form-fields-3-row"
                  controlId="size-validation"
                >
                  <Form.Label>Size</Form.Label>
                  <Form.Select
                    className="pet-size form-input"
                    type="number"
                    name="size"
                    value={values.size}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        nonRequiredPetFields,
                        setNonRequiredPetFields
                      );
                    }}
                    disabled={values.type != "dog" ? true : false}
                    isInvalid={errors.size}
                  >
                    <option value="">Select size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Form.Select>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.size}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-fields-3-row"
                  controlId="sex-validation"
                >
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    className="pet-sex form-input"
                    type="text"
                    name="sex"
                    value={values.sex}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        requiredPetFields,
                        setrequiredPetFields
                      );
                    }}
                    isInvalid={errors.sex}
                  >
                    <option value="">Select sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </Form.Select>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.sex}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-fields-3-row"
                  controlId="age-validation"
                >
                  <Form.Label>Lifestage</Form.Label>
                  <Form.Select
                    className="pet-age form-input"
                    type="text"
                    name="age"
                    value={values.age}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        nonRequiredPetFields,
                        setNonRequiredPetFields
                      );
                    }}
                    isInvalid={errors.age}
                  >
                    <option value="">Select lifestage</option>
                    <option value="young">Young</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                  </Form.Select>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="addpet-form-section">
                <Form.Group
                  className="mb-3 form-fields-2-row"
                  controlId="vaccination-history-validation"
                >
                  <Form.Label>Vaccination history</Form.Label>
                  <Button className="vaccination-pet-button" variant="outline-secondary">Add a vaccination record...</Button>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-fields-2-row"
                  controlId="reproductive-status-validation"
                >
                  <Form.Label>Spayed/Neutered</Form.Label>
                  <Form.Select
                    className="pet-reproductive-status form-input"
                    type="text"
                    name="reproductiveStatus"
                    value={values.reproductiveStatus}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(
                        e,
                        nonRequiredPetFields,
                        setNonRequiredPetFields
                      );
                    }}
                    isInvalid={errors.reproductiveStatus}
                  >
                    <option value="">Unknown</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No </option>
                  </Form.Select>
                  <Form.Control.Feedback className="form-error" type="invalid">
                    {errors.reproductiveStatus}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group
                className="mb-3 form-fields"
                controlId="description-validation"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="pet-description form-input"
                  as="textarea"
                  name="description"
                  value={values.description}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e, requiredPetFields, setrequiredPetFields);
                  }}
                  placeholder="Tell us a little more about your pet..."
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 photos-form-container">
                <Form.Label>Photos</Form.Label>
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
                  adding={true}
                  edit={false}
                  preview={"preview"}
                />
              </Form.Group>

              <div className="mb-3 buttons-form-container">
                <Form.Group className="mb-3">
                  <Button
                    bsPrefix="cancel-pet-button"
                    variant="secondary"
                    type="submit"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  {isClicked ? null : (
                    <Button bsPrefix="add-pet-button" type="submit">
                      Add pet
                    </Button>
                  )}
                </Form.Group>
              </div>
            </Form>
          )}
        </Formik>
        <br />
        {isClicked ? <Pet requiredPetFields={requiredPetFields} /> : null}

        <Alert
          show={showAlert}
          text={alertText}
          title={alertTitle}
          type={alertType}
          onHide={() => setShowAlert(false)}
          onExited={handleOnExited ? () => navigateToPetProfile(petId) : null}
        />
      </Container>
    </>
  );
}

export default AddAPetForm;
