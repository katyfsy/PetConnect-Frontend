import PropTypes from "prop-types";
import { Button, ProgressBar } from "react-bootstrap";
import "./PhotoPreviews.css";

const PhotoPreviews = ({
  photos,
  coverPhoto,
  handleCoverPhoto,
  handleRemoveThumb,
  currentUpload,
  progress,
  showRadio,
  adding,
  edit,
  preview,
  photoId,
}) => {
  const printHandle = (e) => {
    console.log(e.target);
  };

  return photos.map((photo, index) => (
    <div className="photo-preview" key={index}>
      <div className="thumb-container">
        {edit && coverPhoto === photo[preview] ? (
          <div className="thumb-cover-label">Cover Photo</div>
        ) : coverPhoto === index ? (
          <div className="thumb-cover-label">Cover Photo</div>
        ) : (
          <></>
        )}
        <div
          className="thumb"
          onClick={(e) => {
            // console.log(e);
            handleCoverPhoto(edit ? e : index);
          }}
        >
          <div className="thumb-inner">
            <img
              value={photo[preview]}
              name="coverPhoto"
              className="thumb-photo"
              src={photo[preview]}
              alt="preview"
              // Revoke data uri after image is loaded
              // onLoad={() => { URL.revokeObjectURL(photo.preview) }}
            />
          </div>
        </div>
        <div className="thumb-caption">
          <Button
            className="thumb-remove-button"
            value={photo[preview]}
            variant="outline-danger"
            size="sm"
            onClick={(e) =>
              !edit
                ? handleRemoveThumb(index)
                : handleRemoveThumb(e, photo[photoId])
            }
          >
            Remove
          </Button>
          {showRadio ? (
            <div className="thumb-radio-button">
              <input
                type="radio"
                id={`photo_${index + 1}`}
                value={edit ? photo[preview] : index}
                onChange={(e) => {
                  printHandle(e);
                  handleCoverPhoto(edit ? e : index);
                }}
                checked={
                  edit ? coverPhoto === photo[preview] : coverPhoto === index
                }
                name="coverPhoto"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {adding ? (
        <div>
          {currentUpload === index ? (
            <ProgressBar now={progress} />
          ) : (
            <ProgressBar now={currentUpload > index ? 100 : 0} />
          )}
        </div>
      ) : null}
    </div>
  ));
};

PhotoPreviews.propTypes = {
  photos: PropTypes.array.isRequired,
  // coverPhoto: PropTypes.number.isRequired,
  handleCoverPhoto: PropTypes.func.isRequired,
  handleRemoveThumb: PropTypes.func.isRequired,
  currentUpload: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  showRadio: PropTypes.bool,
  adding: PropTypes.bool,
};

export default PhotoPreviews;
