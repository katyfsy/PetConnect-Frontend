import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from './Rating';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ReviewSummary({ avgRating, ratingPercentage, ratingCount}) {
  return (
    <Container>
      <Row className="mb-3">
        <h1>Adopter Reviews</h1>
      </Row>
      <Row className="mb-3">
        <Rating rating={avgRating} size="30px" />
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>5 Star ({ratingCount[4]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[4]} label={`${ratingPercentage[4]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>4 Star ({ratingCount[3]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[3]} label={`${ratingPercentage[3]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>3 Star  ({ratingCount[2]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[2]} label={`${ratingPercentage[2]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>2 Star ({ratingCount[1]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[1]} label={`${ratingPercentage[1]}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>1 Star  ({ratingCount[0]})</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={ratingPercentage[0]} label={`${ratingPercentage[0]}%`} />
        </Col>
      </Row>
    </Container>
  )
}

export default ReviewSummary;