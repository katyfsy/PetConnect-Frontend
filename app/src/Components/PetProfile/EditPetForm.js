import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Pet from "./Pet";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditPetForm.css";
import Alert from "./AlertModalPetForms";
import axios from "axios";
import { getUser } from "../UserProfile/psb-exports";
import AddPhotosPortal from "./AddPhotosPortal";
import PhotoPreviews from "./PhotoPreviews";

function EditPetForm() {
  const navigate = useNavigate();
  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    navigate(`/pet/${id}`, { replace: true });
  };

  // Pet State from Pet Profile page
  const { state } = useLocation();

  // Alert States
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [handleOnExited, setHandleOnExited] = useState(false);

  // Portal and Photo states
  const [openPortal, setOpenPortal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(0);
  const [exisitingPhotos, setExistingPhotos] = useState(state.thisPet.photos);
  const [deletePhotos, setDeletePhotos] = useState([]);
  const [addPhotos, setAddPhotos] = useState([]);

  // Pet Fields that change state
  const [editedPetFields, setEditedPetFields] = useState({
    coverPhoto: state.thisPet.coverPhoto,
  });

  const handlePetFieldsChange = (e, form, setform) => {
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
  };

  // Functionalities for Photo selection & deletion
  function handleChangeCoverPhoto(e) {
    if (e.target.type == "radio") {
      setEditedPetFields({
        ...editedPetFields,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.src) {
      setEditedPetFields({
        ...editedPetFields,
        [e.target.name]: e.target.getAttribute("value"),
      });
    } else if (e.target.querySelector("img").getAttribute("value")) {
      setEditedPetFields({
        ...editedPetFields,
        coverPhoto: e.target.querySelector("img").getAttribute("value"),
      });
    } else {
      console.log("yo no se");
    }
  }

  function handleDeletedPhotosFromUI(e, id) {
    if (e.target.value === editedPetFields.coverPhoto) {
      setShowAlert(true);
      setAlertTitle("Must Select Different Cover Photo First Before Deletion");
      setAlertText("Pet profiles require at least one photo");
      setAlertType("error");
      setHandleOnExited(false);
    } else {
      if (typeof id !== "string") {
        console.log("in db");
        setDeletePhotos([...deletePhotos, id]);
        const photosWithOutDeleted = exisitingPhotos.filter(
          (photo) => photo.photoId !== id
        );
        setExistingPhotos(photosWithOutDeleted);
      }
      if (typeof id == "string") {
        const photosWithOutDeleted = addPhotos.filter(
          (photo) => photo.name !== id
        );
        setAddPhotos(photosWithOutDeleted);
      }
    }
  }

  function deletePhotosFromDB(photosToDelete) {
    if (photosToDelete.length === 0) {
      return true;
    }
    photosToDelete.forEach((photo) => {
      fetch(
        `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/${state.thisPet.petId}?photoId=${photo}`,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          return false;
        })
        .then((data) => {
          console.log(data);
        });
    });
    return true;
  }

  // Functionality to Patch pet details in backend
  function handlePatch() {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${state.thisPet.petId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPetFields),
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
  const handleOnSubmit = async (e) => {
    await handlePatch();
    let successDeleting = await deletePhotosFromDB(deletePhotos);
    if (successDeleting) {
      await handleUpload(addPhotos, state.thisPet.petId);
    }
  };

  // Functionality to upload photos
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

  const extractFileData = (photos, petId) => {
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

  function findCoverPhotoName(listOfPhotos) {
    if (editedPetFields.coverPhoto.includes("blob")) {
      let p = listOfPhotos.filter((photo) => {
        return photo.preview === editedPetFields.coverPhoto;
      });
      return p[0].name;
    }
    let x = editedPetFields.coverPhoto.substring(
      editedPetFields.coverPhoto.lastIndexOf("/") + 1
    );
    return x;
  }

  const handleUpload = async (photos, petId) => {
    if (photos.length === 0) {
      setShowAlert(true);
      setAlertTitle("Congratulations");
      setAlertText("Pet profile edited successfully");
      setAlertType("success");
      setHandleOnExited(true);
    }
    let files = extractFileData(photos, petId);
    let urls = await getPresignedUrls(files);
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
        };
        await axios
          .put(urls[i], photos[i], options)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      await axios
        .post(
          `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/persist?petId=${
            state.thisPet.petId
          }&coverPhoto=${findCoverPhotoName(photos)}`
        )
        .then((res) => console.log(res))
        .then((res) => {
          setShowAlert(true);
          setAlertTitle("Congratulations");
          setAlertText("Pet profile edited successfully");
          setAlertType("success");
          setHandleOnExited(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  console.log("Pet fields: ", editedPetFields);
  if (state.thisPet === null) {
    return <div></div>;
  }
  return (
    <>
      <Container className="editpet-form-container">
        <h3>{`Edit ${state.thisPet.name}'s profile`}</h3>
        <br />
        <Formik
          validationSchema={schema}
          onSubmit={handleOnSubmit}
          initialValues={{
            name: state.thisPet.name,
            city: state.thisPet.city,
            state: state.thisPet.state,
            zip: state.thisPet.zip,
            type: state.thisPet.type,
            breed: state.thisPet.breed,
            species: state.thisPet.species,
            size: state.thisPet.size,
            age: state.thisPet.age,
            sex: state.thisPet.sex,
            description: state.thisPet.description,
            reproductiveStatus: state.thisPet.reproductiveStatus,
          }}
        >
          {({ handleSubmit, handleChange, values, isValid, errors }) => (
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
                  //   defaultValue={state.thisPet.name}
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    handlePetFieldsChange(
                      e,
                      editedPetFields,
                      setEditedPetFields
                    );
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
                    handlePetFieldsChange(
                      e,
                      editedPetFields,
                      setEditedPetFields
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
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
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
                  controlId="zip-validation"
                >
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    className="pet-zip form-input"
                    type="number"
                    value={values.zip}
                    name="zip"
                    onChange={(e) => {
                      handleChange(e);
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
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

              <div className="addpet-form-section">
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
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
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
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
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
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
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
                  controlId="sexValidation"
                >
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    className="pet-sex form-input"
                    type="text"
                    name="sex"
                    value={values.sex}
                    onChange={(e) => {
                      handleChange(e);
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
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
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
                      );
                    }}
                    isInvalid={errors.age}
                  >
                    <option value="">Select lifestage</option>
                    <option value="baby">Newborn</option>
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
                  <Button
                    className="vaccination-pet-button"
                    variant="outline-secondary"
                  >
                    Add a vaccination record...
                  </Button>
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
                      handlePetFieldsChange(
                        e,
                        editedPetFields,
                        setEditedPetFields
                      );
                    }}
                    isInvalid={errors.reproductiveStatus}
                  >
                    <option value="">Select status</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
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
                    handlePetFieldsChange(
                      e,
                      editedPetFields,
                      setEditedPetFields
                    );
                  }}
                  placeholder="Tell us a little more about your pet..."
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 edit-photos-form-container">
                <Form.Label>Current photos</Form.Label>

                <Button
                  variant="outline-secondary"
                  className="add-photo-button"
                  onClick={() => setOpenPortal(true)}
                >
                  {" "}
                  Add photos
                </Button>

                <div className="existing-preview-container">
                  <PhotoPreviews
                    photos={exisitingPhotos}
                    coverPhoto={editedPetFields.coverPhoto}
                    handleCoverPhoto={handleChangeCoverPhoto}
                    handleRemoveThumb={handleDeletedPhotosFromUI}
                    currentUpload={currentUpload}
                    progress={progress}
                    showRadio={true}
                    adding={false}
                    edit={true}
                    preview={"photo_url"}
                    photoId={"photoId"}
                  />
                  <PhotoPreviews
                    photos={addPhotos}
                    coverPhoto={editedPetFields.coverPhoto}
                    handleCoverPhoto={handleChangeCoverPhoto}
                    handleRemoveThumb={handleDeletedPhotosFromUI}
                    currentUpload={currentUpload}
                    progress={progress}
                    showRadio={true}
                    adding={true}
                    edit={true}
                    preview={"preview"}
                    photoId={"name"}
                  />
                </div>
                <div className="photos-to-add preview-container"></div>
              </Form.Group>

              <div className="mb-3 buttons-form-container">
                <Form.Group className="mb-3">
                  <Button
                    bsPrefix="cancel-pet-button"
                    variant="secondary"
                    type="submit"
                    onClick={() => navigate(`/pet/${state.thisPet.petId}`, { replace: true })}
                  >
                    Cancel
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Button bsPrefix="edit-pet-button" type="submit">
                    Save Changes
                  </Button>
                </Form.Group>
              </div>
            </Form>
          )}
        </Formik>
        <br />

        <AddPhotosPortal
          style={{ zIndex: "4" }}
          openPortal={openPortal}
          setOpenPortal={setOpenPortal}
          thisPet={state.thisPet}
          addPhotos={addPhotos}
          setAddPhotos={setAddPhotos}
          progress={progress}
          currentUpload={currentUpload}
          exisitingPhotos={exisitingPhotos}
        />

        <Alert
          show={showAlert}
          text={alertText}
          title={alertTitle}
          type={alertType}
          onHide={() => setShowAlert(false)}
          onExited={
            handleOnExited
              ? () => navigateToPetProfile(state.thisPet.petId)
              : null
          }
        />
      </Container>
    </>
  );
}

export default EditPetForm;
