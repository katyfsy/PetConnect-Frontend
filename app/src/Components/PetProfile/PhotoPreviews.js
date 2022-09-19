import PropTypes from "prop-types";
import { Button, ProgressBar } from "react-bootstrap";

const PhotoPreviews = ({
  photos,
  coverPhoto,
  handleCoverPhoto,
  handleRemoveThumb,
  currentUpload,
  progress,
  showRadio,
  adding
}) => {

  const printHandle = (e) => {
    console.log(e.target);
  };

  return (

    photos.map((photo, index) => (

        <div className="photo-preview" key={index}>
          <div className="thumb-information">
            {coverPhoto === index ? <div className="thumb-radio-button-label">Cover Photo</div> : <></>}
            <div className="thumb" onClick={() => handleCoverPhoto(index)}>
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
            <div className="thumb-caption">
              <Button className="remove-button" variant="outline-danger" size="sm" onClick={() => handleRemoveThumb(index)}>Remove</Button>
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
    ))
  )
}

PhotoPreviews.propTypes = {
  photos: PropTypes.array.isRequired,
  coverPhoto: PropTypes.number.isRequired,
  handleCoverPhoto: PropTypes.func.isRequired,
  handleRemoveThumb: PropTypes.func.isRequired,
  currentUpload: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  showRadio: PropTypes.bool,
  adding: PropTypes.bool
};

export default PhotoPreviews;