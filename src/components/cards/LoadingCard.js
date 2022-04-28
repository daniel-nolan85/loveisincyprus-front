import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className='product-card' key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };

  return <div className='product-cards'>{cards()}</div>;
};

export default LoadingCard;
