import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPet from "./EditPet";
import VaccineList from "./VaccineList.js";
import AddVaccineModal from "./AddVaccineModal.js";
import { Button, Row, Col, Image, Tab, Tabs, Modal, Carousel } from "react-bootstrap";
import {  FaHeart, FaCat, FaFish } from "react-icons/fa";
import { BsFillFlagFill } from "react-icons/bs"
import { MdPets, MdLocationCity } from "react-icons/md";
import {
  BsGenderFemale,
  BsGenderMale,
  BsQuestionCircleFill,
} from "react-icons/bs";
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

  const [showPhotos, setShowPhotos] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [handleOnExited, setHandleOnExited] = useState(false);

  const hexColor = {
    reported: "#4562d3",
  };

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

<<<<<<< HEAD
=======

  
>>>>>>> petprofile/main
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
      return <MdPets size={16} />;
    }
    if (petType === "cat") {
      return <FaCat size={16} />;
    }
    if (petType === "bird") {
      return <GiHummingbird size={16} />;
    }
    if (petType === "horse") {
      return <GiHorseHead size={16} />;
    }
    if (petType === "fish") {
      return <FaFish size={16} />;
    }
    if (petType === "farmAnimal") {
      return <GiGoat size={16} />;
    }
    if (petType === "smallPet") {
      return <GiRabbitHead size={16} />;
    }
    if (petType === "reptile") {
      return <GiReptileTail size={16} />;
    }
  }

  if (thisPet == null) {
    return null;
  }
  return (
    <>
      <div className="profile-page-container">
        <div className="profile-page-section">
          <div className="profile-page-left-container">
            <div className="profile-page-column-section">
              <div className="profile-page-cover-photo-container">
                <img
                  className="profile-page-cover-photo"
                  src={thisPet.coverPhoto}
                />
              </div>

              {user !== thisPet.owner ? (
                <div className="profile-page-likes-container">
                  {!liked ? (
                    <FaHeart
                      color="white"
                      size="20"
                      onClick={() => handleLike()}
                    />
                  ) : (
                    <FaHeart
                      color="red"
                      size="20"
                      onClick={() => handleRemoveLike()}
                    />
                  )}
                  {calculateLike > 0 ? (
                    <div className="profile-page-likes-count-container">
                      {calculateLike}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}

              {user !== thisPet.owner ? (
                <div className="profile-page-report-container">
                  <div className="profile-page-report-tag">
                    {!reportedHere ? "Report" : "Reported"}
                  </div>
                  {!reportedHere ? (
                    <BsFillFlagFill
                      color="white"
                      size="20"
                      onClick={() => handleReporting()}
                    />
                  ) : (
                    <BsFillFlagFill
                      color={hexColor["reported"]}
                      size="20"
                      onClick={() => handleReporting()}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="profile-page-column-section">
              <div className="profile-page-photo-container">
                {petPhotos.map((petPhoto) => (
                  <div
                    className="profile-page-photo-preview"
                    key={petPhoto.photoId}
                    src={petPhoto.photo_url}
                    onClick={() => setShowPhotos(true)}
                  >
                    <img
                      src={petPhoto.photo_url}
                      className="profile-page-photo"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-page-right-container">
            <div className="profile-page-edit">
              {user === thisPet.owner ? (
                <Button
                  className="profile-page-owner-button"
                  variant="outline-secondary"
                  size="md"
                  onClick={() =>
                    navigate(`/editpet`, {
                      replace: true,
                      state: { thisPet: thisPet },
                    })
                  }
                >
                  {!isEdit ? "Edit profile" : "Cancel"}
                </Button>
              ) : (
                <Button
                  className="profile-page-owner-button"
                  variant="outline-secondary"
                  size="md"
                  onClick={() =>
                    navigate("/messages", {
                      state: { receiverName: thisPet.owner },
                    })
                  }
                >
                  Message owner
                </Button>
              )}
            </div>

            <div className="profile-page-column-section">
              <div className="profile-page-general-info-container">
                <h1 className="pet-name">{thisPet.name}</h1>
                <div className="profile-page-icons">
                  <div className="profile-page-pet-icon-text-pair">
                    <MdLocationCity size={16} />
                    {thisPet.zip}
                  </div>
                  <div className="profile-page-pet-icon-text-pair">
                    {getPetIcon(thisPet.type)}
                    {thisPet.type}
                  </div>
                  <div className="profile-page-pet-icon-text-pair">
                    {thisPet.sex !== "male" && thisPet.sex !== "female" ? (
                      <BsQuestionCircleFill size={16} />
                    ) : thisPet.sex === "male" ? (
                      <BsGenderMale size={16} />
                    ) : (
                      <BsGenderFemale size={16} />
                    )}
                    {thisPet.sex !== "male" && thisPet.sex !== "female"
                      ? "sex is unknown"
                      : thisPet.sex}
                  </div>
                </div>
                {user === thisPet.owner ? (
                  <div className="profile-page-dashboard">
                    <div>Likes: {thisPet.favoriteCount}</div>
                    <div>Reported: {thisPet.reported ? "Yes" : "No"}</div>
                    <div>Adopted: {thisPet.Adopted ? "Yes" : "No"}</div>
                  </div>
                ) : (
                  <div className="profile-page-dashboard-empty"></div>
                )}
              </div>
            </div>

            <div className="profile-page-tab-section">
              <Tabs justify defaultActiveKey="description">
                <Tab
                  tabClassName="profile-page-tab"
                  bsPrefix="profile-page-tab-pane"
                  eventKey="description"
                  title="Description"
                >
                  {thisPet.description}
                </Tab>
                <Tab
                  tabClassName="profile-page-tab"
                  bsPrefix="profile-page-tab-pane"
                  eventKey="info"
                  title="Details"
                >
                  <div className="profile-page-pet-details-container">
                    <div className="profile-page-pet-details-column">
                      {thisPet.name ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Pet's name:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.name}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.type ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Type:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.type}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.species ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Species:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.species}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.breed ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Breed:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.breed}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.size ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Size:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.size}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.age ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Age:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.age}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.sex ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Sex:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.sex}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.reproductiveStatus ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Spayed/Neutered:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.reproductiveStatus}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="profile-page-pet-details-column">
                      {thisPet.owner ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Owner:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.owner}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.city ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            City:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.city}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.state ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            State:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.state}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {thisPet.zip ? (
                        <div className="profile-page-pet-property">
                          <div className="profile-page-pet-property-key">
                            Zipcode:
                          </div>
                          <div className="profile-page-pet-property-value">
                            {thisPet.zip}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab
                  tabClassName="profile-page-tab"
                  eventKey="vaccines"
                  title="Vaccines"
                >
                  <VaccineList pet={thisPet} />
                </Tab>

                <Tab
                  tabClassName="profile-page-tab"
                  eventKey="contact"
                  title="Contact">
                  <div className="profile-page-contact-card">
                    <User owner={thisPet.owner} />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="profile-page-section">

          {/* {
            user !== thisPet.owner ? null : (
              <>
                <br />
                <Button variant="danger" size="md" onClick={handleOnDelete}>
                  Delete Pet
                </Button>
              </>
            )
          } */}
        </div>
      </div>

      {!isEdit ? null : (
        <EditPet
          thisPet={thisPet}
          setIsEdit={setIsEdit}
          setThisPet={setThisPet}
          refetchPet={refetchPet}
        />
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

      <Modal show={showPhotos} contentClassName="profile-page-gallery" centered onHide={() => setShowPhotos(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{thisPet.name}'s photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {petPhotos.map((petPhoto) => (
              <Carousel.Item>
                <img
                  className="img-fluid"
                  key={petPhoto.photoId}
                  src={petPhoto.photo_url}
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
      <br />
    </>
  );
}

export default Pet;
