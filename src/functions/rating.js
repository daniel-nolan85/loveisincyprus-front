import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArr = p && p.ratings;
    let total = [];
    let length = ratingsArr.length;
    // console.log('length', length);
    ratingsArr.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log('totalReduced', totalReduced);
    let highest = length * 5;
    // console.log('highest', highest);
    let result = (totalReduced * 5) / highest;
    // console.log('result', result);
    return (
      <div>
        <StarRating
          rating={result}
          starDimension='20px'
          starSpacing='2px'
          starRatedColor='gold'
          editing={false}
        />{' '}
        ({p.ratings.length})
      </div>
    );
  }
};
