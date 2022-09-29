import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddPhotosPortal from "./AddPhotosPortal";
import EditVaccinesList from "./EditVaccinesList.js";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhotoPreviews from "./PhotoPreviews";

function EditPet({ thisPet, setIsEdit, refetchPet }) {
  const [openPortal, setOpenPortal] = useState(false);

  const [exisitingPhotos, setExistingPhotos] = useState(thisPet.photos);
  const [deletePhotos, setDeletePhotos] = useState([]);
  const [addPhotos, setAddPhotos] = useState([]);

  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(0);

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

  console.log("these are state of attributes:", petAttributes);
  console.log("photo state", addPhotos);
  console.log("deletestate", deletePhotos);

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
    if (petAttributes.coverPhoto.includes("blob")) {
      let p = listOfPhotos.filter((photo) => {
        console.log(
          photo.preview,
          petAttributes.coverPhoto,
          photo.preview === petAttributes.coverPhoto
        );
        return photo.preview === petAttributes.coverPhoto;
      });
      return p[0].name;
    }
    let x = petAttributes.coverPhoto.substring(
      petAttributes.coverPhoto.lastIndexOf("/") + 1
    );
    return x;
  }

  const handleUpload = async (photos, petId) => {
    let files = extractFileData(photos, petId);
    console.log(files);
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

  function handleChangePreview(e) {
    // console.log(e.target.src);
    if (e.target.src) {
      setPetAttributes({
        ...petAttributes,
        [e.target.name]: e.target.getAttribute("value"),
      });
    } else {
      setPetAttributes({
        ...petAttributes,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleOnChange(e) {
    console.log(e);
    if (e.target.type == "number")
      setPetAttributes({
        ...petAttributes,
        [e.target.name]: parseInt(e.target.value),
      });
    else if (e.target.type == "checkbox") {
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

  // Functionality when pressing the delete button
  function handleDelete(e, id) {
    console.log(id);
    if (e.target.value === petAttributes.coverPhoto) {
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
  console.log(thisPet.photos);
  function handlePatch() {
    if (petAttributes.coverPhoto.includes("blob")) {
      let newatt = { ...petAttributes };
      delete newatt.coverPhoto;
      setPetAttributes(newatt);
    }
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${thisPet.petId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petAttributes),
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

  // set alert if its false
  function deleteDatabase(photosToDelete) {
    if (photosToDelete.length == 0) {
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
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await handlePatch();
    let successDeleting = await deleteDatabase(deletePhotos);
    if (successDeleting) {
      await handleUpload(addPhotos, thisPet.petId);
      setIsEdit(false);
    }
  };

  console.log(deletePhotos);

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Owner</Form.Label>
        <Form.Control
          name="owner"
          className="pet-owner-name"
          readOnly={true}
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
      <div className="photos-from-db preview-container">
        <PhotoPreviews
          photos={exisitingPhotos}
          coverPhoto={petAttributes.coverPhoto}
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
      </div>
      <div className="photos-to-add preview-container">
        <PhotoPreviews
          photos={addPhotos}
          coverPhoto={petAttributes.coverPhoto}
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
      {/* <div style={{ display: "flex", width: 50, padding: 30 }}>
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
        {addPhotos?.map((photo) => {
          return (
            <div id={photo.name}>
              <Image
                style={{ display: "block", width: 250, padding: 30 }}
                src={photo.preview}
                key={photo.name}
                roundedCircle
              />

              <Button
                onClick={(e) => handleDelete(e, photo.name)}
                value={photo.preview}
              >
                {" "}
                Delete
              </Button>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  name="coverPhoto"
                  value={photo.preview}
                  type="radio"
                  label="Cover Photo"
                  onClick={handleOnChange}
                  defaultChecked={thisPet.coverPhoto === photo.preview}
                />
              </Form.Group>
            </div>
          );
        })}
        <div />
      </div> */}
      <Button onClick={() => setOpenPortal(true)}> Add Photos</Button>
      <AddPhotosPortal
        openPortal={openPortal}
        setOpenPortal={setOpenPortal}
        thisPet={thisPet}
        addPhotos={addPhotos}
        setAddPhotos={setAddPhotos}
        progress={progress}
        currentUpload={currentUpload}
      />

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

      <Button
        onClick={() => findCoverPhotoName(addPhotos)}
        className="add-pet-button"
      >
        Test
      </Button>
      <Button type="submit" className="add-pet-button">
        Finish Editing
      </Button>
    </Form>
  );
}

export default EditPet;
