import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import ProgressBar from 'react-bootstrap/ProgressBar';

import Alert from "./AlertModalPetForms"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import "./Photos.css";
import { useDropzone } from "react-dropzone";


const Photos = ({
  photos,
  coverPhoto,
  handleAddPhotos,
  handleRemovePhotos,
  handleCoverPhoto,
  showRadios,
  maxPhotos,
  progress,
  currentUpload
}) => {
  const [showRadio, setShowRadio] = useState(showRadios);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");

  const customValidation = useCallback((file) => {

    if (maxPhotos - photos.length === 0) {
      return {
        code: "max-files-exceeded",
        message: `Maximum of ${maxPhotos} photos exceeded`
      };
    } else {
      for (let i = 0; i < photos.length; i++) {
        if (file.name === photos[i].name) {
          return {
            code: "same-file-name",
            message: `A photo with ${file.name} is already staged for upload`
          };
        }
      }
    }
  }, [photos])


  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      console.log("these are the accepted photos", acceptedFiles);
      let newPhotos = acceptedFiles.map((photo) =>
          Object.assign(photo, {
            preview: URL.createObjectURL(photo),
          })
        );
      handleAddPhotos(newPhotos);
      console.log("latestPhotos(one behind): ", photos);
    },
    [photos]
  );

  const onDropRejected = useCallback(
    (e) => {
      let error = e[0].errors[0].code
      let message = e[0].errors[0].message
      console.log(e[0].errors)
      if (error === "too-many-files" || error === "max-files-exceeded") {
        setShowAlert(true)
        setAlertTitle("Maximum number of photos exceeded")
        setAlertText(`Photo allowance per profile is ${maxPhotos}`)
        setAlertType("error")
      } else if (error === "file-invalid-type") {
        console.log(e)
        setShowAlert(true)
        setAlertTitle("File type not allowed")
        setAlertText("Attempted to upload a file that is not an image")
        setAlertType("error")
      } else if (error === "same-file-name") {
        setShowAlert(true)
        setAlertTitle("One or more photos were not staged")
        setAlertText("Photos with the same name are ignored")
        setAlertType("error")
      } else {
        setShowAlert(true)
        setAlertTitle("Unable to process this request")
        setAlertText("Unknown error")
        setAlertType("error")
      }
    },
    [photos]
  );

  const handleRemoveThumb = (index) => {
    if (index === coverPhoto) {
      handleCoverPhoto(0);
    } else if (index < coverPhoto) {
      handleCoverPhoto(coverPhoto - 1);
    }
    handleRemovePhotos([
      ...photos.slice(0, index),
      ...photos.slice(index + 1, photos.length),
    ]);
  };

  const printHandle = (e) => {
    console.log(e.target);
  };

  const {
    getRootProps,
    getInputProps,
    open,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    validator: customValidation,
    // onDrop,
    onDropAccepted,
    onDropRejected,

    noClick: true,
    noKeyboard: true,
    maxFiles: maxPhotos - photos.length,
    multiple: true,
    accept: {
      "image/jpg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".wepb"],
      "image/bmp": [".bmp"]
    },
  });

  const additionalClass = useMemo(() => {
    let className = "";
    if (isDragAccept) {
      className = "accept";
    } else if (isDragReject) {
      className = "reject";
    } else if (isFocused) {
      className = "focus";
    }
    return className;
  }, [isFocused, isDragAccept, isDragReject]);

  const previews = photos.map((photo, index) => (
    <div className="photo-preview" key={index}>
      <div className="thumb">
        <div className="thumb-inner">
          <img
            className="thumb-photo"
            src={photo.preview}
            alt="preview"
            // Revoke data uri after image is loaded
            // onLoad={() => { URL.revokeObjectURL(photo.preview) }}
          />
        </div>
      </div>
      <div
        className="thumb-remove-button"
        onClick={() => handleRemoveThumb(index)}
      >
        🗑 Remove
      </div>
      {showRadio ? (
        <div className="thumb-radio-button">
          <input
            type="radio"
            id={`photo_${index + 1}`}
            value={index}
            onChange={(e) => {
              printHandle(e);
              handleCoverPhoto(index);
            }}
            checked={coverPhoto === index}
            name="coverPhoto"
          />
          <label htmlFor={`photo_${index + 1}`}>Cover Photo</label>
        </div>
      ) : (
        <div></div>
      )}
      <div>
        {currentUpload === index ? <ProgressBar now={progress}/> :
          <ProgressBar now={currentUpload > index ? 100 : 0} />}
      </div>

    </div>
  ));

  return (
    <>
      <div className="photo-uploader-container">
        {/* <div className="pu-title">
          {`Upload up to ${maxPhotos} photos for this pet profile`}
        </div> */}
        <div {...getRootProps({ className: `dropzone ${additionalClass}` })}>
          <input {...getInputProps()} />
          <FontAwesomeIcon className={isDragActive ? "dropzone-icon-active" : "dropzone-icon-inactive"} icon={isDragActive ? faFolderOpen : faFolder} />
          {/* <span>{isDragActive ? "🐈‍" : "🐈‍⬛"}</span> */}
          <p>Drag n' drop or select up to {maxPhotos}</p>
          <button className="pu-browse-button" type="button" onClick={open}>
            Browse files...
          </button>
        </div>
        <div className="pu-status">{`${photos.length} / ${maxPhotos}`}</div>
        <div className="preview-container">{previews}</div>
        <Alert
          show={showAlert}
          text={alertText}
          title={alertTitle}
          type={alertType}
          onHide={() => setShowAlert(false)}
        />
      </div>
    </>
  );
};

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  coverPhoto: PropTypes.number.isRequired,
  handleAddPhotos: PropTypes.func.isRequired,
  handleRemovePhotos: PropTypes.func.isRequired,
  handleCoverPhoto: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  currentUpload: PropTypes.number.isRequired
};

export default Photos;
