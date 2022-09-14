import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function AddPetButton() {
  let navigate = useNavigate();

  function handleOnClick(event) {
    event.preventDefault();
    if (localStorage.getItem("username") == "") {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      navigate("/addPet", { replace: true });
    }
  }
  return (
    <>
      <Button onClick={handleOnClick} size="lg">
        Add a Pet
      </Button>
    </>
  );
}

export default AddPetButton;
