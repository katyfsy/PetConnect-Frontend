import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from './Rating';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ReviewSummary() {
  return (
    <Container>
      <Row className="mb-3">
        <h1>Adopter Reviews</h1>
      </Row>
      <Row className="mb-3">
        <Rating rating={4.5} size="30px" />
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>5 Star</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={60} label={`${60}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>4 Star</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={20} label={`${20}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>3 Star</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={10} label={`${10}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>2 Star</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={5} label={`${5}%`} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>
          <p>1 Star</p>
        </Col>
        <Col sm={8}>
          <ProgressBar now={5} label={`${5}%`} />
        </Col>
      </Row>
    </Container>
  )
}

export default ReviewSummary;