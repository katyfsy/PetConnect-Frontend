import React, { useState } from 'react';
import { Row, Button, Container, Col, Modal, Form, ProgressBar } from 'react-bootstrap';
import Rating from 'react-rating';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getBearerToken, getUser, PSB_API_URL } from "./psb-exports";
import UploadMultiPics from './UploadMultiPics';

function ReviewSummary({ avgRating, ratingPercentage, ratingCount, filterFiveStars, orgUsername,
                         filterFourStars, filterThreeStars, filterTwoStars, filterOneStars, updateReviews}) {

  const [show, setShow] = useState(false);
  const [star, setStar] = useState(0);
  const [imageUrl, setImageUrl] = useState([]);
  const [images, setImages] = useState([]);
  const [presignedUrls, setPresignedUrls] = useState([])
  const [urlCache, setUrlCache] = useState([]);

  const handleClose = () => {
    setShow(false);
    setStar(0);
  };
  const handleShow = () => setShow(true);

  const [reviewForm, setReviewForm] = useState({
    writtenByUsername: "",
    firstName: "",
    lastName: "",
    userPhoto: "",
    reviewTitle: "",
    reviewDescription: "",
    reviewScore: 0,
    upvotes: 0,
    reviewImages: []
  });

  const params = useParams();

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  }

  const handleReviewPhotoSubmit = (urls, files) => {
    let imageUrlList = imageUrl;
    for(let i = 0; i < urls.length; i++) {
      imageUrlList.push(urls[i].split("?")[0]);
      axios.put(urls[i], files[i],
        {headers: {
          "Content-Type": "application/octet-stream"
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    setImageUrl(imageUrlList);
  }

  const handlePostRequest = (form) => {
    axios.post(`${PSB_API_URL}/api/reviews/${orgUsername}`, form,
    {headers: {
      'Authorization': getBearerToken()
    }})
    .then(() => alert('post success'))
    .catch((err) => console.log(err));
  }

  const handleReviewSubmit = () => {
    axios.get(`${PSB_API_URL}/api/user/${getUser()}`,
      {headers: {
        'Authorization': getBearerToken()
      }})
      .then((res) => {
        reviewForm.firstName = res.data.firstName;
        reviewForm.lastName = res.data.lastName;
        reviewForm.userPhoto = res.data.userPhoto;
        reviewForm.reviewScore = star;
        reviewForm.writtenByUsername = res.data.username;
      })
      .then(() => {
        handleReviewPhotoSubmit(presignedUrls, images);
      })
      .then(() => {
        reviewForm.reviewImages = imageUrl;
        handlePostRequest(reviewForm);
        setStar(0);
      })
      .then(() => {
        setTimeout(updateReviews, 1000);
      })
      .catch((err) => console.log('review submit error', err))
  }

  const handleStar = (e) => {
    setStar(e);
  }

  const renderWriteReview = () => {
    if(getUser() === null || getUser() === "") {
      return (
      <div>
        <h5>Share your thoughts with other adopters</h5>
        <Button onClick={() => alert("Please login first to write a review.")} >Write your review</Button>
      </div>
      )} else if (params.username !== getUser() && params.username !== undefined) {
        return (
          <div>
            <h5>Share your thoughts with other adopters</h5>
            <Button onClick={handleShow} >Write your review</Button>
          </div>
      )}
  }

  return (
    <Container>
      <Row className="mb-3">
        <h1>Adopter Reviews</h1>
      </Row>
      <Row className="mb-3">
        <Rating initialRating={avgRating}
          emptySymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-empty.png" className="icon" alt="empty-star"/>}
          fullSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-full.png" className="icon" alt="full-star"/>}
          readonly
        />
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p onClick={() => filterFiveStars()}>5 Star ({ratingCount[4]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[4]} label={`${ratingPercentage[4]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p onClick={() => filterFourStars()}>4 Star ({ratingCount[3]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[3]} label={`${ratingPercentage[3]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p onClick={() => filterThreeStars()}>3 Star  ({ratingCount[2]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[2]} label={`${ratingPercentage[2]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p onClick={() => filterTwoStars()}>2 Star ({ratingCount[1]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[1]} label={`${ratingPercentage[1]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p onClick={() => filterOneStars()}>1 Star  ({ratingCount[0]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[0]} label={`${ratingPercentage[0]}%`} />
        </Col>
      </Row>
      <Row style={{paddingTop: "30px"}}>
        {renderWriteReview()}
      </Row>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Rate your experience</h5>
          <Rating
            initialRating={star}
            emptySymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-empty.png" className="icon" alt="empty-star"/>}
            fullSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-full.png" className="icon" alt="full-star"/>}
            onChange={handleStar}
          />
          <Form style={{paddingTop: "30px"}}>
            <Form.Group className="mb-3" controlId="reviewTitle">
              <Form.Label>Add a headline</Form.Label>
              <Form.Control required type="text" placeholder="What's most important to know?" name="reviewTitle" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewDescription">
              <Form.Label>Add a written review</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="What did you like or dislike?" name="reviewDescription" onChange={handleChange}/>
            </Form.Group>
          </Form>
          <UploadMultiPics
            images={images}
            setImages={setImages}
            presignedUrls={presignedUrls}
            setPresignedUrls={setPresignedUrls}
            urlCache={urlCache}
            setUrlCache={setUrlCache}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handleClose(); handleReviewSubmit()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ReviewSummary;