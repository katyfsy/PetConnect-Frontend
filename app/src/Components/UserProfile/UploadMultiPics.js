import React, { useState } from 'react';
import { Button, Image, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { getBearerToken, PSB_API_URL } from "./psb-exports";

function UploadMultiPics({ images, setImages, presignedUrls, setPresignedUrls, urlCache, setUrlCache}) {

  const MAX_COUNT = 5;

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
    for(let i = 0; i < e.target.files.length; i++) {
      if(urlCache.length === 0) {
        axios.get(`${PSB_API_URL}/api/upload`,
        {headers: {
          'Authorization': getBearerToken()
        }})
        .then((res) => {
          let presignedUrlsList = presignedUrls;
          presignedUrlsList.push(res.data);
          setPresignedUrls(presignedUrlsList);
        })
      } else {
        let presignedUrlsList = presignedUrls;
        let urlCacheList = urlCache;
        presignedUrlsList.push(urlCacheList.pop());
        setPresignedUrls(presignedUrlsList);
        setUrlCache(urlCacheList);
      }
    }
    //for presentation
    console.log("presigned url list", presignedUrls);
    console.log("deleted url cache", urlCache);
  }

  const handleRemoveImage = (imageName) => {
    let uploaded = [...images];
    uploaded.forEach((uploadedImage, index) => {
      if(uploadedImage.name === imageName) {
        uploaded.splice(index, 1);
      }
    })
    setImages(uploaded);
    // save unused presigned urls to urlCache
    let presignedUrlsList = presignedUrls;
    let urlCacheList = urlCache;
    urlCacheList.push(presignedUrlsList.pop());
    setPresignedUrls(presignedUrlsList);
    setUrlCache(urlCacheList);

    //for presentation
    console.log("presigned url list", presignedUrls);
    console.log("deleted url cache", urlCache);
  }

  return (
    <div>
      <h5>Upload Pictures ({images.length}/5)</h5>
      <Container>
        <Row>
          {images.map((image) => {
            return (<Col md="auto" key={image.name}>
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
                          style={{marginLeft:20, marginBottom:7, marginTop:3}}
                          onClick={() => handleRemoveImage(image.name)}
                          key={image.name}
                        >Remove</Button>
                      </div>
                    </Col>)
                  })}
          </Row>
      </Container>
      <div className="upload-button">
        <input onChange={handleFileEvent} type="file" multiple accept="image/*" disabled={fileLimit}/>
      </div>
    </div>
  )
}

export default UploadMultiPics;