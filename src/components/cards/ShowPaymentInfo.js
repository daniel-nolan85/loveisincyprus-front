import React from 'react';

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span>Order ID: {order.paymentIntent.id}</span>{' '}
        <span>
          Amount:{' '}
          {(order.paymentIntent.amount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>{' '}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{' '}
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{' '}
        <span>
          Ordered on:{' '}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>{' '}
        <span>Status: {order.orderStatus}</span>{' '}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
