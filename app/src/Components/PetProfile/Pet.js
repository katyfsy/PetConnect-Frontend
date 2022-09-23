import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPet from "./EditPet";
import VaccineList from "./VaccineList.js";
import AddVaccineModal from "./AddVaccineModal.js";
import { Button, Row, Col, Image, Tab, Tabs } from "react-bootstrap";
import { FaRegHeart, FaHeart, FaCat, FaFish } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { RiGenderlessFill } from "react-icons/ri";
import { ImPlus } from "react-icons/im";
import { GrFlag, GrLocation } from "react-icons/gr";
import Alert from "./AlertModalPetForms";
import axios from "axios";
import User from "../UserProfile/User.js";

import {
  GiHummingbird,
  GiHorseHead,
  GiGoat,
  GiRabbitHead,
  GiReptileTail,
} from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { getUser, PSB_API_URL } from "../UserProfile/psb-exports";
import "./Pet.css";

import { LightgalleryItem } from "react-lightgallery";

function Pet() {
  const [thisPet, setThisPet] = useState(null);
  const [calculateLike, setCalcLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [reportStatus, updateReportStatus] = useState(false);
  const [reportedHere, setReportedHere] = useState(false);
  const [petPhotos, setPetPhotos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [fetchPet, refetchPet] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [handleOnExited, setHandleOnExited] = useState(false);

  let user = getUser();
  let petId = useParams();
  const navigate = useNavigate();
  console.log(thisPet);

  const [form, setForm] = useState({
    username: "",
    businessName: "",
    phone: "",
    email: "",
    website: "",
    userType: "ORGANIZATION",
    city: "",
    state: "",
    zipCode: "",
    description: "",
    userPhoto: "",
  });

  useEffect(() => {
    axios
      .get(`${PSB_API_URL}/api/public/users/orgs/${user}`)
      .then((res) => {
        let result = res.data;
        for (var key in result) {
          if (result[key] === null) {
            result[key] = "";
          }
          if (result.userPhoto === "") {
            result.userPhoto =
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
          }
        }
        setForm(result);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(form);
  // Fetch Pet, with refetch to refetch new pet data upon finishing edit
  useEffect(() => {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId.id}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error("errrrrrr");
        console.error(err);
      })
      .then((data) => {
        setCalcLike(data.favoriteCount);
        updateReportStatus(data.reported);
        setThisPet(data);
        setPetPhotos(data.photos);
      });
  }, [isEdit, fetchPet]);

  function handleOnDelete() {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/${petId.id}`,
      { method: "DELETE" }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })
      .then((data) => {
        console.log("deleteddd");
        setShowAlert(true);
        setAlertTitle("Congratulations");
        setAlertText("Pet Profile successfully Deleted");
        setAlertType("success");
        setHandleOnExited(true);
      });
  }
  function handleLike() {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/addFavorite/${petId.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })
      .then((data) => {
        setCalcLike(data.favoriteCount);
      });

    setLiked(!liked);
  }
  function handleRemoveLike() {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/removeFavorite/${petId.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })
      .then((data) => {
        setCalcLike(data.favoriteCount);
      });
    setLiked(!liked);
  }

  function handleReporting() {
    fetch(
      `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/report/${petId.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })
      .then((data) => {
        updateReportStatus(data.reported);
        refetchPet(Math.random());
        console.log(data);
      });
    setReportedHere(!reportedHere);
  }

  function getPetIcon(petType) {
    if (petType === "dog") {
      return <MdPets size={28} />;
    }
    if (petType === "cat") {
      return <FaCat size={28} />;
    }
    if (petType === "bird") {
      return <GiHummingbird size={28} />;
    }
    if (petType === "horse") {
      return <GiHorseHead size={28} />;
    }
    if (petType === "fish") {
      return <FaFish size={28} />;
    }
    if (petType === "farmAnimal") {
      return <GiGoat size={28} />;
    }
    if (petType === "smallPet") {
      return <GiRabbitHead size={28} />;
    }
    if (petType === "reptile") {
      return <GiReptileTail size={28} />;
    }
  }

  if (thisPet == null) {
    return null;
  }
  return (
    <>
      <br />

      <div className="profile-page-container">
        <div className="profile-page-left-container">
          <div className="profile-page-cover-photo-container">
            <img className="profile-page-cover-photo" src={thisPet.coverPhoto} />
          </div>

          {/* <Image

            roundedCircle
            className="profile-photo rounded-circle"
          /> */}

          <br />
          <div className="profile-page-photo-container">
            {petPhotos.map((petPhoto) => (
              <div
                className="profile-page-photo-preview"
                key={petPhoto.photoId}
                src={petPhoto.photo_url}
              >
                <img src={petPhoto.photo_url} className="profile-page-photo" />
              </div>
            ))}
          </div>




          {/* {petPhotos.map((petPhoto) => (
            <LightgalleryItem
              key={petPhoto.photoId}
              src={petPhoto.photo_url}
              group={"any"}
            >
              <img src={petPhoto.photo_url} width={"200"} height={"200"} />
            </LightgalleryItem>
          ))} */}
        </div>

        <div className="profile-page-right-container">
          <div className="profile-page-buttons">
            {user !== thisPet.owner ? (
              <>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    navigate("/messages", {
                      state: { receiverName: thisPet.owner },
                    })
                  }
                >
                  Contact Owner
                </Button>


                {!liked ? (
                  <>
                  <FaRegHeart size={42} onClick={() => handleLike()} />
                  <p>{calculateLike}</p>
                  </>
                ) : (
                  <>
                  <FaHeart
                    color="red"
                    size={42}
                    onClick={() => handleRemoveLike()}
                  />

                  <p>{calculateLike}</p>
                  </>
                )}


                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleReporting()}
                >
                  <GrFlag /> Report Pet
                </Button>

                {reportedHere}
              </>
            ) : (
              <>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    navigate(`/editpet`, {
                      replace: true,
                      state: { thisPet: thisPet },
                    })
                  }
                >
                  {!isEdit ? "Edit Details" : "Cancel Edit"}
                </Button>





                <div className="vaccine-btn-ctr">
                  <AddVaccineModal
                    owner={user}
                    petId={thisPet.petId}
                    petName={thisPet.name}
                  />
                </div>
              </>
            )}
          </div>
          <Row className="mb-3">

            <Col>
              <Row className="mb-3" id="pet-info-header">
                <Col>
                  <Row>
                    <h1 className="pet-name">{thisPet.name}</h1>
                    <p className="pet-location">
                      <GrLocation size={28} /> {thisPet.zip}
                    </p>
                  </Row>
                </Col>

              </Row>

              <div className="profile-page-icons">
                {getPetIcon(thisPet.type)} {thisPet.type}{" "}
                {thisPet.sex == "male" ? (
                  <>
                    <BsGenderMale size={28} /> {thisPet.sex}
                  </>
                ) : thisPet.sex == "female" ? (
                  <>
                    <BsGenderFemale size={28} /> {thisPet.sex}
                  </>
                ) : (
                  <>
                    <RiGenderlessFill size={28} /> Gender Unknown
                  </>
                )}
              </div>


              <br />
              <Row className="mb-3" id="user-description"></Row>
              <Row className="mb-3">
                <Tabs
                  defaultActiveKey="description"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="description" title="Description">
                    <p>{thisPet.description}</p>
                  </Tab>
                  <Tab eventKey="info" title="Additional Info">
                    <p>Name: {thisPet.name}</p>
                    <p>Owner: {thisPet.owner}</p>
                    <p>City: {thisPet.city}</p>
                    <p>State: {thisPet.state}</p>
                    <p>Zip: {thisPet.zip}</p>
                    <p>Type: {thisPet.type}</p>
                    <p>Weight: {thisPet.weight}</p>
                    <p>Age: {thisPet.age}</p>
                    <p>Sex: {thisPet.sex}</p>
                    <p>
                      Reproductive Status:{" "}
                      {thisPet.reproductiveStatus ? "No Kids" : "Yes Kids"}
                    </p>

                    <p>Likes: {thisPet.favoriteCount}</p>
                    <p>Reported: {thisPet.reported ? "true" : "false"}</p>
                    <p>Adopted: {thisPet.adopted ? "true" : "false"}</p>
                  </Tab>
                  <Tab eventKey="vaccines" title="Vaccine History">
                    <VaccineList pet={thisPet} />
                  </Tab>
                  <Tab eventKey="contact" title="Contact">
                    <div className="contact-card-tab">
                      <User owner={thisPet.owner} />
                    </div>

                    {/* {Object.keys(form).map((key, index) => {
                  return (
                    <p key={index}>
                      {key}: {form[key]}
                    </p>
                  );
                })} */}
                  </Tab>
                </Tabs>
              </Row>
            </Col>

            <br />
            <br />
            {!isEdit ? null : (
              <EditPet
                thisPet={thisPet}
                setIsEdit={setIsEdit}
                setThisPet={setThisPet}
                refetchPet={refetchPet}
              />
            )}
          </Row>
        </div>
      </div>



      {user !== thisPet.owner ? null : (
        <>
          <br />
          <Button variant="danger" size="md" onClick={handleOnDelete}>
            Delete Pet
          </Button>
        </>
      )}

      <Alert
        show={showAlert}
        text={alertText}
        title={alertTitle}
        type={alertType}
        onHide={() => setShowAlert(false)}
        onExited={handleOnExited ? () => navigate("/pets") : null}
        // handleOnExited('/pets')
      />
      <br />
    </>
  );
}

export default Pet;
