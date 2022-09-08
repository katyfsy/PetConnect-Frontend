import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

function AddPetButton() {
    let navigate = useNavigate();
    function handleOnClick(event) {
        event.preventDefault();
        navigate("/addPet", { replace: true });
      }
    return (
      <>
        <Button onClick={handleOnClick} size="lg">Add a Pet</Button>
      </>
    );
  }
  
  export default AddPetButton;