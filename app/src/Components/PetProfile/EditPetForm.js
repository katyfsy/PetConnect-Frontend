import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Modal from 'react-bootstrap/Modal';
import Pet from "./Pet";
import { useNavigate } from "react-router-dom";
import "./EditPetForm.css";
import Photos from "./Photos";
import Alert from "./AlertModalPetForms";
import axios from "axios";
import { getUser } from "../UserProfile/psb-exports";
import AddPhotosPortal from "./AddPhotosPortal";
import PhotoPreviews from "./PhotoPreviews";

function EditPetForm({ thisPet }) {
  const [petId, setPetId] = useState(null);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [handleOnExited, setHandleOnExited] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
  const [exisitingPhotos, setExistingPhotos] = useState(null);
  const [deletePhotos, setDeletePhotos] = useState([]);
  const [addPhotos, setAddPhotos] = useState([]);
  const [editedPetFields, setEditedPetFields] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(0);

  useEffect(() => {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/240`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error("errrrrrr");
        console.error(err);
      })
      .then((data) => {
        setThisPet(data);
        setPetId(data.petId);
        setExistingPhotos(data.photos);
        setEditedPetFields({ ...editedPetFields, coverPhoto: data.coverPhoto });
      });
  }, []);

  function handleChangePreview(e) {
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

  function deleteDatabase(photosToDelete) {
    if (photosToDelete.length === 0) {
      return true;
    }
    photosToDelete.forEach((photo) => {
      fetch(
        `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/${thisPet.petId}?photoId=${photo}`,
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
  const handleOnChange = (e, form, setform) => {
    if (e.target.name === "reproductiveStatus" && e.target.value === "") {
      setform({
        ...form,
        [e.target.name]: null,
      });
    } else {
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
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

  const extractFileData = (photos, petId) => {
    let files = [];
    for (let i = 0; i < photos.length; i++) {
      let fileData = {};
      fileData.petId = petId;
      fileData.filename = photos[i].name;
      fileData.filetype = photos[i].type;
      files.push(fileData);
    }
    console.log("files from within extract function", files);
    return files;
  };

  function findCoverPhotoName(listOfPhotos) {
    if (editedPetFields.coverPhoto.includes("blob")) {
      let p = listOfPhotos.filter((photo) => {
        console.log(
          photo.preview,
          editedPetFields.coverPhoto,
          photo.preview === editedPetFields.coverPhoto
        );
        return photo.preview === editedPetFields.coverPhoto;
      });
      console.log(
        "name of cover photo being sent to endpoint after urls upload if new photo",
        p[0].name
      );
      return p[0].name;
    }
    let x = editedPetFields.coverPhoto.substring(
      editedPetFields.coverPhoto.lastIndexOf("/") + 1
    );
    console.log(
      "name of cover photo being sent to endpoint after urls upload if photo in db",
      x
    );
    return x;
  }
  console.log("these photos are in our to be added state", addPhotos);
  const handleUpload = async (photos, petId) => {
    console.log("petId from within handle upload", petId);
    console.log("photos being passed from onSubmit", photos);
    let files = extractFileData(photos, petId);
    console.log("files from within extract function", files);
    let urls = await getPresignedUrls(files);
    console.log("files from within extract function", urls);
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
        console.log(urls[i], photos[i], options);
        await axios
          .put(urls[i], photos[i], options)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      // alert("Photos uploaded successfully");
      await axios
        .post(
          `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/persist?petId=${petId}&coverPhoto=${findCoverPhotoName(
            photos
          )}`
        )
        .then((res) => console.log(res))
        .then((res) => {
          // setTimeout(() => {
          //   alert("Photos uploaded successfully");
          // }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // const handleUpload = async (petId) => {
  //   let files = extractFileData(petId);
  //   console.log(files);
  //   let urls = await getPresignedUrls(files);

  //   if (photos.length > 0) {
  //     for (let i = 0; i < photos.length; i++) {
  //       setCurrentUpload(i);
  //       let options = {
  //         headers: {
  //           "Content-Type": photos[i].type,
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           const progress = (progressEvent.loaded / progressEvent.total) * 100;
  //           setProgress(progress);
  //         },
  //         // onDownloadProgress: (progressEvent) => {
  //         //   const progress = 50 + (progresssEvent.loaded / progressEvent.total) * 100;
  //         //   console.log("THIS IS THE PROGRESSS: ", progress);
  //         //   setProgress(progress);
  //         // }
  //       };

  //       await axios
  //         .put(urls[i], photos[i], options)
  //         .then((res) => console.log(res))
  //         .catch((err) => console.log(err));
  //     }
  //     // alert("Photos uploaded successfully");
  //     await axios
  //       .post(
  //         `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/persist?petId=${petId}&coverPhoto=${photos[coverPhoto].name}`
  //       )
  //       .then((res) => console.log(res))
  //       .then((res) => {
  //         setShowAlert(true);
  //         setAlertTitle("Congratulations");
  //         setAlertText("Pet profile created successfully");
  //         setAlertType("success");
  //         setHandleOnExited(true);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     setShowAlert(true);
  //     setAlertTitle("Photo requirements not met");
  //     setAlertText("Pet profiles require at least one photo");
  //     setAlertType("error");
  //     setHandleOnExited(false);
  //   }
  // };
  function handlePatch() {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId}`,
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
    let successDeleting = await deleteDatabase(deletePhotos);
    if (successDeleting) {
      await handleUpload(addPhotos, petId);
    }
  };

  function handleDelete(e, id) {
    console.log(id);
    if (e.target.value === editedPetFields.coverPhoto) {
      alert("Must Select Different Cover Photo First Before Deletion");
    } else {
      if (typeof id !== "string") {
        console.log("in db");
        setDeletePhotos([...deletePhotos, id]);
        const photosWithOutDeleted = exisitingPhotos.filter(
          (photo) => photo.photoId !== id
        );
        setExistingPhotos(photosWithOutDeleted);
      }
      console.log(thisPet.petId, id);
      if (typeof id == "string") {
        const photosWithOutDeleted = addPhotos.filter(
          (photo) => photo.name !== id
        );
        setAddPhotos(photosWithOutDeleted);
      }
    }
  }

  console.log("pet information", thisPet);
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

  console.log("Pet fields: ", editedPetFields);
  if (thisPet === null) {
    return <div></div>;
  }
  return (
    <>
      <Container className="editpet-form-container">
        <h3>Let's create the pet's profile</h3>
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
            name: thisPet.name,
            city: thisPet.city,
            state: thisPet.state,
            zip: thisPet.zip,
            type: thisPet.type,
            breed: thisPet.breed,
            species: thisPet.species,
            size: thisPet.size,
            age: thisPet.age,
            sex: thisPet.sex,
            description: thisPet.description,
            reproductiveStatus: thisPet.reproductiveStatus,
            // photos: ,
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
                controlId="ownerValidation"
              >
                <Form.Label>Owner</Form.Label>
                {getUser() != "" ? (
                  <Form.Control
                    name="owner"
                    defaultValue={getUser()}
                    disabled={true}
                    className="pet-owner-name"
                  />
                ) : (
                  <></>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3 form-fields"
                controlId="nameValidation"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="pet-name"
                  type="text"
                  name="name"
                  //   defaultValue={thisPet.name}
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e, editedPetFields, setEditedPetFields);
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
                  className="pet-city"
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e, editedPetFields, setEditedPetFields);
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
                  controlId="zipValidation"
                >
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                    type="number"
                    value={values.zip}
                    name="zip"
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                    className="pet-type"
                    type="text"
                    name="type"
                    value={values.type}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                    className="pet-size"
                    type="number"
                    name="size"
                    value={values.size}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                    className="pet-sex"
                    type="text"
                    name="sex"
                    value={values.sex}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                    className="pet-age"
                    type="text"
                    name="age"
                    value={values.age}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
                    }}
                    isInvalid={errors.age}
                  >
                    <option value="">Select lifestage</option>
                    <option value="early">Early</option>
                    <option value="mid">Mid</option>
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
                  controlId="reproductiveStatus-validation"
                >
                  <Form.Label>Spayed / Neutered</Form.Label>
                  <Form.Select
                    className="pet-reproductiveStatus"
                    type="text"
                    name="reproductiveStatus"
                    value={values.reproductiveStatus}
                    onChange={(e) => {
                      handleChange(e);
                      handleOnChange(e, editedPetFields, setEditedPetFields);
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
                controlId="descriptionValidation"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="pet-description form-input"
                  as="textarea"
                  name="description"
                  value={values.description}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e, editedPetFields, setEditedPetFields);
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

                <Button onClick={() => setOpenPortal(true)}> Add photos</Button>

                <div className="existing-preview-container">
                  <PhotoPreviews
                    photos={exisitingPhotos}
                    coverPhoto={editedPetFields.coverPhoto}
                    handleCoverPhoto={handleChangePreview}
                    handleRemoveThumb={handleDelete}
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
                    handleCoverPhoto={handleChangePreview}
                    handleRemoveThumb={handleDelete}
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
                    variant="secondary"
                    type="submit"
                    onClick={() => navigate(-1)}
                  >
                    {"<"} Go Back
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  {isClicked ? null : (
                    <Button type="submit" className="add-pet-button">
                      Add Pet
                    </Button>
                  )}
                </Form.Group>
              </div>
            </Form>
          )}
        </Formik>
        <br />
        {isClicked ? <Pet editedPetFields={editedPetFields} /> : null}

        <AddPhotosPortal
          style={{ zIndex: "4" }}
          openPortal={openPortal}
          setOpenPortal={setOpenPortal}
          thisPet={thisPet}
          addPhotos={addPhotos}
          setAddPhotos={setAddPhotos}
          progress={progress}
          currentUpload={currentUpload}
        />

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

export default EditPetForm;
