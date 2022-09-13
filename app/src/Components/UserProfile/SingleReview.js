import React, { useState } from 'react';
import { Button, Card, Image, Col, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import moment from 'moment';
import axios from 'axios';

function SingleReview({ review }) {

  const [upvotes, setUpvotes] = useState(review.upvotes);

  const handleUpvote = () => {
    // axios.patch(`api/reviews/upvote/${review.reviewId}`)
    //   .then(() => axios.patch(`api/user/${review.writtenByUsername}`))
    //   .then(() => setUpvotes(upvotes + 1))
    //   .catch((err) => console.log(err));
    setUpvotes(upvotes + 1);
  }
  return (
    <Card className="mb-5">
      <Card.Header as="h5">
        <Row>
          <Col xs={3}>
            <div style={{paddingTop:10}}>
              <Rating
                initialRating={review.reviewScore}
                emptySymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-empty.png" className="icon" alt="empty-star"/>}
                fullSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-full.png" className="icon" alt="full-star"/>}
                readonly
              />
            </div>
          </Col>
          <Col xs={6}>
            <Card.Title align="start" style={{"paddingTop": "15px"}}>{review.reviewTitle}</Card.Title>
          </Col>
          <Col>
          <Image src={review.userPhoto} roundedCircle width="40"/>
            <Card.Text style={{fontSize: '15px'}}>
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
        {review.reviewImages.map((reviewImage) => {
          return <Image src={reviewImage} style={{width:100}} key={reviewImage}/>
        })}
      </Row>
      <Row className="mt-3">
        <Col xs={9}>
          <p style={{textAlign: "left", paddingLeft: "20px"}}>{moment(review.timeStamp).fromNow()}</p>
        </Col>
        <Col xs={1}>
            <Button variant="Light" onClick={() => handleUpvote()}>☺</Button>
        </Col>
        <Col xs={2}>
          <p style={{textAlign: "left", paddingTop:"7px"}}>Helpful ({upvotes})</p>
        </Col>
      </Row>
    </Card>
  );
}

export default SingleReview;