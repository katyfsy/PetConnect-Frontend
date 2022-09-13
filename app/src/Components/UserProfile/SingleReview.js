import React from 'react';
import { Button, Card, Image, Col, Row } from 'react-bootstrap';
import Rating from 'react-rating';

function SingleReview({ review }) {
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
      <Row>
        <Col xs={9}>
          <p style={{textAlign: "left", paddingLeft: "20px"}}>{review.timeStamp}</p>
        </Col>
        <Col xs={1}>
            <Button variant="Light">☺</Button>
        </Col>
        <Col xs={2}>
          <p style={{textAlign: "left", paddingTop:"7px"}}>helpful({review.upvotes})</p>
        </Col>
      </Row>
    </Card>
  );
}

export default SingleReview;