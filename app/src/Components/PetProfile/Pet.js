import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPet from "./EditPet";
import { Button, Row, Col, Image } from "react-bootstrap";
import { FaRegHeart, FaHeart, FaCat, FaFish } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { RiGenderlessFill } from "react-icons/ri";
import { ImPlus } from "react-icons/im";
import { GrFlag, GrLocation } from "react-icons/gr";
import {
  GiHummingbird,
  GiHorseHead,
  GiGoat,
  GiRabbitHead,
  GiReptileTail,
} from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { getUser } from "../UserProfile/psb-exports";
import "./Pet.css";

import { LightgalleryItem } from "react-lightgallery";

function Pet() {
  const [thisPet, setThisPet] = useState(null);
  const [calculateLike, setCalcLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [petPhotos, setPetPhotos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [fetchPet, refetchPet] = useState(false);
  let user = getUser();
  let petId = useParams();
  const navigate = useNavigate();
  console.log(petId);

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
        setThisPet(data);
        setPetPhotos(data.photos);
      });
  }, []);

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
        console.log(data);
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

      <Row className="mb-3">
        <Col>
          <Image
            src={thisPet.coverPhoto}
            roundedCircle
            className="profile-photo rounded-circle"
          />

          <br />
          {petPhotos.map((petPhoto) => (
            <LightgalleryItem
              key={petPhoto.photoId}
              src={petPhoto.photo_url}
              group={"any"}
            >
              <img src={petPhoto.photo_url} width={"200"} height={"200"} />
            </LightgalleryItem>
          ))}
        </Col>
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
            {user !== thisPet.owner ? (
              <>
                <Col>
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
                </Col>

                {!liked ? (
                  <Col>
                    <FaRegHeart size={42} onClick={() => handleLike()} />
                  </Col>
                ) : (
                  <Col>
                    <FaHeart
                      color="red"
                      size={42}
                      onClick={() => handleRemoveLike()}
                    />
                  </Col>
                )}
                {calculateLike}
                <Col>
                  <Button variant="primary" size="md" href="/">
                    <GrFlag /> Report Pet
                  </Button>
                </Col>
                {/* {calculateLike} */}
              </>
            ) : (
              <>
                <Col>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Edit Details
                  </Button>
                </Col>
                <Col>
                  <br />
                  <Button variant="primary" size="md" onClick={handleOnDelete}>
                    Delete Pet
                  </Button>
                </Col>
              </>
            )}
          </Row>
          <Row className="mb-3" id="user-name">
            <Col>
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
            </Col>
            {/* <Col>
              {" "}
              <Row className="mb-3"></Row>
            </Col> */}
          </Row>
          {/* <Col></Col> */}
          <br/>
          <Row className="mb-3" id="user-description">
            <h3 className="user-description">Description:</h3>
            <p>{thisPet.description}</p>
          </Row>
        </Col>

        <br />
        <br />
        <h3>Delete this section later </h3>
        {!isEdit ? (
          <>
            <p>Name: {thisPet.name}</p>
            <p>Owner: {thisPet.owner}</p>
            <p>Location: {thisPet.location}</p>
            <p>Type: {thisPet.type}</p>
            <p>Description: {thisPet.description}</p>

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
          </>
        ) : (
          <EditPet
            thisPet={thisPet}
            setIsEdit={setIsEdit}
            setThisPet={setThisPet}
            refetchPet={refetchPet}
          />
        )}
      </Row>
      <br />
    </>
  );
}

export default Pet;
