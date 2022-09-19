import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactDom from "react-dom";
import Photos from "./Photos";

function AddPhotosPortal({
  addPhotos,
  setAddPhotos,
  openPortal,
  setOpenPortal,
  thisPet,
  progress,
  currentUpload,
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
    <div>
      <button onClick={() => setOpenPortal(false)}>Close</button>
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
        maxPhotos={
          MAX_NUMBER_OF_PHOTOS - thisPet.photos.length - addPhotos.length
        }
      />
      <button onClick={handleOnSubmit}>Upload Photos</button>
    </div>,
    document.getElementById("portal")
  );
}

export default AddPhotosPortal;
