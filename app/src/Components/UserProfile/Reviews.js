import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import SingleReview from './SingleReview';
import ReviewSummary from './ReviewSummary';

function Reviews() {
  return (
    <Container>
      <Row>
        <Col>
          <ReviewSummary />
        </Col>
        <Col>
          <SingleReview />
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews;