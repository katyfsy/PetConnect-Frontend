import React, { useState, useEffect } from 'react';
import { Container, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import SingleReview from './SingleReview';
import ReviewSummary from './ReviewSummary';
import { getBearerToken, getUser, PSB_API_URL } from "./psb-exports";
import axios from 'axios';

function Reviews({ orgUsername }) {
  const [reviews, setReviews] = useState([]);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingPercentage, setRatingPercentage] = useState([0,0,0,0,0]);
  const [ratingCount, setRatingCount] = useState([0,0,0,0,0]);
  const [votedOnReviews, setVotedOnReviews] =useState([]);

  useEffect(() => {
    if (getUser() !== null) {
      axios.get(`${PSB_API_URL}/api/user/${getUser()}`,
      {headers: {
        'Authorization': getBearerToken()
      }})
      .then((res) => {
        if(res.data.votedOnReviews === undefined || res.data.votedOnReviews === null) {
          setVotedOnReviews([]);
        } else {
        setVotedOnReviews(res.data.votedOnReviews)
      }})
      .catch((err) => console.log(err))
    }

    axios.get(`${PSB_API_URL}/api/public/reviews/${orgUsername}`)
    .then((res) => {
      setReviews(res.data.reviews);
      // setCurrentReviews(res.data.reviews);
      sortMostRecent(res.data.reviews);
      calculateAvgRating(res.data.reviews);
      calculateRatingPercent(res.data.reviews);
    })
    .catch((err) => console.log(err))

  },[orgUsername])

  function calculateAvgRating(reviews) {
    if(reviews !== []) {
      let totalScore = 0;
      reviews.forEach(review => {
        totalScore += review.reviewScore;
      })
      setAvgRating(totalScore/reviews.length)
    }
  }

  function calculateRatingPercent(reviews) {
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

  const filterFiveStars = () => {
    let reviewList = [];
    reviews.forEach((review) => {
      if(review.reviewScore === 5) {
        reviewList.push(review);
      }
    });
    setCurrentReviews(reviewList);
  }

  const filterFourStars = () => {
    let reviewList = [];
    reviews.forEach((review) => {
      if(review.reviewScore === 4) {
        reviewList.push(review);
      }
    });
    setCurrentReviews(reviewList);
  }

  const filterThreeStars = () => {
    let reviewList = [];
    reviews.forEach((review) => {
      if(review.reviewScore === 3) {
        reviewList.push(review);
      }
    });
    setCurrentReviews(reviewList);
  }

  const filterTwoStars = () => {
    let reviewList = [];
    reviews.forEach((review) => {
      if(review.reviewScore === 2) {
        reviewList.push(review);
      }
    });
    setCurrentReviews(reviewList);
  }

  const filterOneStars = () => {
    let reviewList = [];
    reviews.forEach((review) => {
      if(review.reviewScore === 1) {
        reviewList.push(review);
      }
    });
    setCurrentReviews(reviewList);
  }

  const sortMostHelpful = () => {
    let reviewList = [...reviews];
    reviewList.sort((a, b) => {
      return b.upvotes - a.upvotes;
    })
    setCurrentReviews(reviewList);
  }

  const sortMostRecent = (reviews) => {
    let reviewList = [...reviews];
    reviewList.sort((a, b) => {
      let da = new Date(a.timeStamp);
      let db = new Date(b.timeStamp);
      return db - da;
    })
    setCurrentReviews(reviewList);
  }

  const updateReviews = () => {
    axios.get(`${PSB_API_URL}/api/public/reviews/${orgUsername}`)
    .then((res) => {
      setReviews(res.data.reviews);
      // setCurrentReviews(res.data.reviews);
      sortMostRecent(res.data.reviews);
      calculateAvgRating(res.data.reviews);
      calculateRatingPercent(res.data.reviews);
    })
    .catch((err) => console.log(err));
  }

  return (
    <Container style={{paddingTop: "70px"}}>
      <Row>
        <Col xs={4} style={{paddingRight: "100px"}}>
          <ReviewSummary
            avgRating={avgRating}
            ratingPercentage={ratingPercentage}
            ratingCount={ratingCount}
            filterFiveStars={filterFiveStars}
            filterFourStars={filterFourStars}
            filterThreeStars={filterThreeStars}
            filterTwoStars={filterTwoStars}
            filterOneStars={filterOneStars}
            updateReviews={updateReviews}
            orgUsername={orgUsername}
          />
        </Col>
        <Col xs={8}>
        <div className="mb-2" align="left">
          <DropdownButton
            variant="light"
            key='up'
            id={'dropdown-button-drop-up'}
            drop='up'
            title={'Sort'}
          >
            <Dropdown.Item onClick={() => sortMostRecent(reviews)}>Most Recent</Dropdown.Item>
            <Dropdown.Item onClick={() => sortMostHelpful()}>Most Helpful</Dropdown.Item>
          </DropdownButton>
        </div>
          <div className="overflow-auto" style={{height: 550}}>
            {
              currentReviews.map((review) => {
                return <SingleReview review={review} key={review.reviewId} votedOnReviews={votedOnReviews}/>
              })
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews;