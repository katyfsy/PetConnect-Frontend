import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactDom from "react-dom";
import Photos from "./Photos";

function AddPhotosPortal({
  addPhotos,
  setAddPhotos,
  openPortal,
  setOpenPortal,
  petId,
  refetchPet,
  thisPet,
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
  const extractFileData = (petId) => {
    let files = [];
    for (let i = 0; i < toAddPhotos.length; i++) {
      let fileData = {};
      fileData.preview = toAddPhotos[i].preview;
      fileData.petId = petId;
      fileData.filename = toAddPhotos[i].name;
      fileData.filetype = toAddPhotos[i].type;
      files.push(fileData);
    }
    return files;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (toAddPhotos.length == 0) {
      setOpenPortal(false);
    } else {
      setAddPhotos(extractFileData(petId));
      setOpenPortal(false);
    }
  };
  if (!openPortal) return null;
  return ReactDom.createPortal(
    <div>
      <button onClick={() => setOpenPortal(false)}>Close</button>
      <Photos
        photos={toAddPhotos}
        coverPhoto={coverPhoto}
        handleAddPhotos={handleAddPhotos}
        handleRemovePhotos={handleRemovePhotos}
        handleCoverPhoto={handleCoverPhoto}
        showRadios={false}
        maxPhotos={MAX_NUMBER_OF_PHOTOS - thisPet.photos.length}
      />
      <button onClick={handleOnSubmit}>Upload Photos</button>
    </div>,
    document.getElementById("portal")
  );
}

export default AddPhotosPortal;
