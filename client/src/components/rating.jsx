import React from 'react'
import ReactStars from 'react-stars'

const RatingStar = (props) =>
  <ReactStars
    half={true}
    count={5}
    onChange={props.handleRating}
    size={24}
    color2={'#ffd700'}
  />

export default RatingStar;
