import React from 'react';
import moment from 'moment';

const ShowPaymentInfo = ({ order }) => {
  console.log('order => ', order);
  return (
    <div>
      <p>
        <span>Order ID: {order.paymentIntent.id}</span>{' '}
        <span>
          Total Paid: €
          {order.paymentIntent.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>{' '}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{' '}
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{' '}
        <span>
          Ordered on:{' '}
          {moment(order.paymentIntent.created).format('MMMM Do YYYY')}
          {/* {new Date(order.paymentIntent.created * 1000).toLocaleString()} */}
        </span>{' '}
        <span>Order Status: {order.orderStatus}</span>
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
