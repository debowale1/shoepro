import React from 'react'
import PropTypes from 'prop-types';

const Rating = ({rating, numReviews}) => {
  return (
    <div className="rating">
      <i className = {rating >= 1 ? 'icon-star voted' : 'icon-star'}></i>
      <i className = {rating >= 2 ? 'icon-star voted' : 'icon-star'}></i>
      <i className = {rating >= 3 ? 'icon-star voted' : 'icon-star'}></i>
      <i className = {rating >= 4 ? 'icon-star voted' : 'icon-star'}></i>
      <i className = {rating >= 5 ? 'icon-star voted' : 'icon-star'}></i>
      <em>{`out of (${numReviews})`}</em>
    </div>
  )
}

//setting default props
// Rating.defaultProps = {
//   color: '#f8e825'
// }

Rating.propType = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
}

export default Rating
