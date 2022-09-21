import React from 'react';
import PropTypes from 'prop-types';
import './Rating.scss';

/**
 * Renders a fraction out of 5 stars based on the rating prop that is passed in.
 * @param {Number} rating Number of stars out of 5.
 * @param {String} size Size of stars in pixels ('10px', '20px' '37.3px' etc).
 * @returns {React Component}
 */

function Rating({ rating, size }) {
  return (
    <div className="stars" style={{ '--rating': rating, '--star-size': size }} aria-label={`Rating of this product is ${rating} out of 5.`} />
  );
}
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};

export default Rating;