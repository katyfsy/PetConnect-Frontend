import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";

import ReactDom from "react-dom";
import Photos from "./Photos";
import "./AddPhotosPortal.css";

function AddPhotosPortal({
  addPhotos,
  setAddPhotos,
  openPortal,
  setOpenPortal,
  thisPet,
  progress,
  currentUpload,
  exisitingPhotos,
}) {
  const [coverPhoto, setCoverPhoto] = useState(0);
  const [toAddPhotos, setToAddPhotos] = useState([]);
  const MAX_NUMBER_OF_PHOTOS = 5;

  const handleAddPhotos = (newPhotos) => {
    setToAddPhotos([...toAddPhotos, ...newPhotos]);
  };

  const handleRemovePhotos = (photos) => {
    setToAddPhotos(photos);
  };

  const handleCoverPhoto = (selection) => {
    setCoverPhoto(selection);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (toAddPhotos.length == 0) {
      setOpenPortal(false);
    } else {
      setAddPhotos([...addPhotos, ...toAddPhotos]);
      setToAddPhotos([]);
      setOpenPortal(false);
    }
  };
  if (!openPortal) return null;
  return ReactDom.createPortal(
    <div className="add-photos-portal-bg">
      <div className="add-photos-portal-container">
        <Photos
          adding={false}
          photos={toAddPhotos}
          coverPhoto={coverPhoto}
          handleAddPhotos={handleAddPhotos}
          handleRemovePhotos={handleRemovePhotos}
          handleCoverPhoto={handleCoverPhoto}
          showRadios={false}
          progress={progress}
          currentUpload={currentUpload}
          edit={false}
          preview={"preview"}
          maxPhotos={
            MAX_NUMBER_OF_PHOTOS - exisitingPhotos.length - addPhotos.length
          }
        />
        <div className="portal-button-container">
          <Button
            bsPrefix="cancel-pet-button"
            onClick={() => setOpenPortal(false)}
          >
            Cancel
          </Button>
          <Button bsPrefix="add-pet-button" onClick={handleOnSubmit}>
            Select
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default AddPhotosPortal;
