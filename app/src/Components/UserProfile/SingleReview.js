import React, { useState, useEffect } from 'react';
import { Button, Card, Image, Col, Row, Modal, Carousel } from 'react-bootstrap';
import Rating from 'react-rating';
import moment from 'moment';
import axios from 'axios';
import { getBearerToken, PSB_API_URL } from "./psb-exports";
import "./SingleReview.css";

function SingleReview({ review, votedOnReviews }) {

  const [upvotes, setUpvotes] = useState(review.upvotes);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [time, setTime] =useState();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if(votedOnReviews.includes(review.reviewId) || getBearerToken() === null) {
      setButtonDisabled(true);
    }
    let stillUtc = moment.utc(review.timeStamp).toDate();
    let local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    setTime(local);
  }, [review.reviewId, votedOnReviews])

  const handleUpvote = () => {
    axios.patch(`${PSB_API_URL}/api/reviews/upvote/${review.reviewId}`, {},
      {headers: {
      'Authorization': getBearerToken()
      }})
      .then(() => setUpvotes(upvotes + 1))
      .catch((err) => console.log(err));
    setUpvotes(upvotes + 1);
    setButtonDisabled(true);
  }

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setIndex(e);
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
    <Card className="mb-5">
      <Card.Header as="h5" style={{backgroundColor: "#8F9ED9"}}>
        <Row>
          <Col xs={3}>
            <div style={{paddingTop:10}}>
              <Rating
                initialRating={review.reviewScore}
                emptySymbol={<img src={require("../Default/HeaderPics/star-empty.png")} className="icon" alt="empty-star"/>}
                fullSymbol={<img src={require("../Default/HeaderPics/star-full.png")} className="icon" alt="full-star"/>}
                readonly
              />
            </div>
          </Col>
          <Col xs={6}>
            <Card.Title align="start" style={{"paddingTop": "15px",color: "white"}}>{review.reviewTitle}</Card.Title>
          </Col>
          <Col>
          <Image src={review.userPhoto} roundedCircle width="40" height="40"/>
            <Card.Text style={{fontSize: '15px', color: "white"}}>
              {review.firstName} {review.lastName}
            </Card.Text>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text align="start">
          {review.reviewDescription}
        </Card.Text>
      </Card.Body>
      <Row style={{marginLeft: 20}}>
        {review.reviewImages.map((reviewImage, imageIndex) => {
          return <Image src={reviewImage} style={{width:100}} key={reviewImage} onClick={(e) => handleShow(imageIndex)}/>
        })}
      </Row>
      <Row className="mt-3">
        <Col xs={9}>
          <p style={{textAlign: "left", paddingLeft: "20px"}}>{moment(time).fromNow()}</p>
        </Col>
        <Col xs={1}>
            <Button variant="warning" disabled={buttonDisabled} onClick={() => handleUpvote()}>☺</Button>
        </Col>
        <Col xs={2}>
          <p style={{textAlign: "left", paddingTop:"7px"}}>Helpful ({upvotes})</p>
        </Col>
      </Row>
    </Card>

    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton style={{backgroundColor: "#8F9ED9"}}>
        <Modal.Title style={{color: "white"}}>Review photos</Modal.Title>
      </Modal.Header>
      <Modal.Body  id="review-modal">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {review.reviewImages.map((reviewImage) => {
            return (
              <Carousel.Item id="review-carousel" key={reviewImage}>
                {/* <Image width="800" src={reviewImage} key={reviewImage} alt="review photo" style={{objectFit: "cover", maxHeight: "100%"}}/> */}
                <Image id="review-image" src={reviewImage} key={reviewImage} alt="review photo"/>
              </Carousel.Item>
            )})}
        </Carousel>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default SingleReview;