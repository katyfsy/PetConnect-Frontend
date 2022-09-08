import React, { useState, useEffect } from 'react';
import { Container, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import SingleReview from './SingleReview';
import ReviewSummary from './ReviewSummary';
import {orgReviews} from './DummyData';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingPercentage, setRatingPercentage] = useState([0,0,0,0,0]);
  const [ratingCount, setRatingCount] = useState([0,0,0,0,0]);

  useEffect(() => {
    setReviews(orgReviews);
    calculateAvgRating();
    calculateRatingPercent();
  },[reviews, avgRating])

  function calculateAvgRating() {
    if(reviews !== []) {
      let totalScore = 0;
      reviews.forEach(review => {
        totalScore += review.reviewScore;
      })
      setAvgRating(totalScore/reviews.length)
    }
  }

  function calculateRatingPercent() {
    if(reviews !== []) {
      let ratingPercentArray = [0,0,0,0,0];
      let ratingCountArray = [0,0,0,0,0];
      for(let i = 0; i < ratingPercentArray.length; i++) {
        let count = 0;
        reviews.forEach(review => {
          if (review.reviewScore === i + 1) {
            count ++;
          }
        })
        ratingCountArray[i] = count;
        ratingPercentArray[i] = Math.floor((count/reviews.length) * 100);
      }
      setRatingPercentage(ratingPercentArray);
      setRatingCount(ratingCountArray);
    }
  }
  return (
    <Container style={{paddingTop: "70px"}}>
      <Row>
        <Col xs={4} style={{paddingRight: "100px"}}>
          <ReviewSummary avgRating={avgRating} ratingPercentage={ratingPercentage} ratingCount={ratingCount}/>
        </Col>
        <Col xs={8}>
        <div className="mb-2" align="left">
          <DropdownButton
            key='up'
            id={'dropdown-button-drop-up'}
            drop='up'
            variant="secondary"
            title={'Sort'}
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
        </div>
          <div className="overflow-auto" style={{height: 500}}>
            {
              reviews.map((review) => {
                return <SingleReview review={review} key={review.firstName}/>
              })
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews;