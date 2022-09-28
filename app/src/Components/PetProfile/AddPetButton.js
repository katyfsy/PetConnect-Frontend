import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUser, getUserType } from "../UserProfile/psb-exports";
import "./AddPetButton.css";

function AddPetButton() {
  let navigate = useNavigate();

  function handleOnClick(event) {
    event.preventDefault();
    if (getUser() == null) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (getUserType() !== "ORGANIZATION") {
      Swal.fire({
        icon: "error",
        title: "Must Be Organization",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      navigate("/addPet", { replace: true });
    }
  }
  return (
    <div>
      <Button id="add-pet-button" onClick={handleOnClick} size="lg">
        Add a Pet
      </Button>
    </div>
  );
}

export default AddPetButton;
