import React, { useState, useEffect, useRef } from 'react';
import { Button, Image } from 'react-bootstrap';

function UploadMultiPics() {

  const MAX_COUNT = 5;

  const [images, setImages] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);



  const handleUploadFiles = (files) => {
    const uploaded = [...images];
    let limitExceeded = false;
    files.some((file) => {
        if (uploaded.findIndex((f) => f.name === file.name) === -1) {
            uploaded.push(file);
            if (uploaded.length === MAX_COUNT) setFileLimit(true);
            if (uploaded.length > MAX_COUNT) {
                alert(`You can only add a maximum of ${MAX_COUNT} files`);
                setFileLimit(false);
                limitExceeded = true;
                return true;
            }
        }
    })
    if (!limitExceeded) setImages(uploaded)
  }

  const handleFileEvent =  (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  }

  const handleRemoveImage = (imageName) => {
    console.log(imageName);
    let uploaded = [...images];
    uploaded.forEach((uploadedImage, index) => {
      if(uploadedImage.name === imageName) {
        uploaded.splice(index, index + 1);
      }
    })
    setImages(uploaded);
  }

  return (
    <div>
      <h5>Upload Pictures</h5>
      {images.map((image) => {
        return (<div>
                  <Image
                    src={URL.createObjectURL(image)}
                    className="review-photo"
                    thumbnail style={{width:100, marginLeft: 5}}
                    key={image.name}
                  />
                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      style={{marginLeft:20, marginBottom:7}}
                      onClick={() => handleRemoveImage(image.name)}
                    >Remove</Button>
                  </div>
                </div>
                )
      })}
      <div className="upload-button">
        <input onChange={handleFileEvent} type="file" multiple accept="image/*" disabled={fileLimit}/>
      </div>
    </div>
  )
}

export default UploadMultiPics;