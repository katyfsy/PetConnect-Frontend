import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactDom from "react-dom";
import Photos from "./Photos";

function AddPhotosPortal({
  openPortal,
  setOpenPortal,
  petId,
  refetchPet,
  thisPet,
}) {
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(0);
  const handleAddPhotos = (newPhotos) => {
    setPhotos([...photos, ...newPhotos]);
  };
  const MAX_NUMBER_OF_PHOTOS = 5;
  const handleRemovePhotos = (photos) => {
    setPhotos(photos);
  };

  const handleCoverPhoto = (selection) => {
    setCoverPhoto(selection);
  };
  const getPresignedUrls = (files) => {
    return axios
      .post("http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/uploadAuth", files)
      .then((res) => {
        return res.data;
      });
  };

  const extractFileData = (petId) => {
    let files = [];
    for (let i = 0; i < photos.length; i++) {
      let fileData = {};
      fileData.petId = petId.toString();
      fileData.filename = photos[i].name;
      fileData.filetype = photos[i].type;
      files.push(fileData);
    }
    return files;
  };

  const handleUpload = async (petId) => {
    let files = extractFileData(petId);
    console.log(files);
    let urls = await getPresignedUrls(files);

    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        let options = {
          headers: {
            "Content-Type": photos[i].type,
          },
        };
        await axios
          .put(urls[i], photos[i], options)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      alert("Photos uploaded successfully");
      await axios
        .post(
          `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/photos/persist?petId=${petId}&coverPhoto=${photos[coverPhoto].name}`
        )
        .then((res) => console.log(res))
        .then((res) => alert("PERSISTED"))
        .catch((err) => console.log(err));
    } else {
      alert("At least one photo is required to upload");
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (photos.length == 0) {
      alert("At least one photo is required to upload");
    } else {
      //   let petId = await createPet();
      // console.log("THIS IS THE PETID: ", petId);
      // await handleUpload(petId);
      // refetchPet(Math.random());
      setOpenPortal(false);
      //   navigateToPetProfile(petId);
    }
  };
  if (!openPortal) return null;
  return ReactDom.createPortal(
    <div>
      <button onClick={() => setOpenPortal(false)}>Close</button>
      <Photos
        photos={photos}
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
