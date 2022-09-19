import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";
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
  currentUpload,
}) => {
  const [showRadio, setShowRadio] = useState(showRadios);
  // console.log("asdlkfjals;dkfjalskdfj", progress, currentUpload)

  const onDrop = useCallback(
    (acceptedPhotos) => {
      console.log("these are the accepted photos", acceptedPhotos);
      if (
        acceptedPhotos.length !== 0 &&
        photos.length + acceptedPhotos.length <= maxPhotos
      ) {
        let newPhotos = acceptedPhotos.map((photo) =>
          Object.assign(photo, {
            preview: URL.createObjectURL(photo),
          })
        );
        handleAddPhotos(newPhotos);
      } else {
        alert(`Only image files allowed.  Maximum number of photos allowed: ${maxPhotos}`);
      }
      console.log("latestPhotos(one behind): ", photos);
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
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: maxPhotos,
    multiple: true,
    accept: {
      "image/*": [".jpeg", ".png"],
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
        {currentUpload === index ? (
          <ProgressBar now={progress} />
        ) : (
          <ProgressBar now={currentUpload > index ? 100 : 0} />
        )}
      </div>
    </div>
  ));

  return (
    <>
      <div className="photo-uploader-container">
        <div className="pu-title">
          {`Upload up to ${maxPhotos} photos for this pet profile`}
        </div>
        <div {...getRootProps({ className: `dropzone ${additionalClass}` })}>
          <input {...getInputProps()} />
          <span>{isDragActive ? "🐈‍" : "🐈‍⬛"}</span>
          <p>Drag n' drop images here</p>
          <p>or</p>
          <button className="pu-browse-button" type="button" onClick={open}>
            Browse files...
          </button>
        </div>
        <div className="pu-status">{`${photos.length} / ${maxPhotos}`}</div>
        <div className="preview-container">{previews}</div>
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
  currentUpload: PropTypes.number.isRequired,
};

export default Photos;
