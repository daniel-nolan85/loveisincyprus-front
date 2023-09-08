import React, { useState, useEffect } from 'react';
import moment from 'moment';

const ShowSubscriptionInfo = ({ subscription }) => {
  //   const [amount, setAmount] = useState('');
  //   const [currency, setCurrency] = useState('');

  //   useEffect(() => {
  //     fetchAmount();
  //     fetchCurrency();
  //   }, []);

  //   const fetchAmount = () =>
  //     setAmount(
  //       order.paymentIntent.purchase_units[0].payments.captures[0].amount.value
  //     );

  //   const fetchCurrency = () =>
  //     setCurrency(
  //       order.paymentIntent.purchase_units[0].payments.captures[0].amount
  //         .currency_code
  //     );

  return (
    <>
      <h2 className='center'>User Info</h2>
      {/* <div className='payment-info'>
        <div>
          <p>
            <span>Order ID: {order.paymentIntent.id}</span> <br />
            {order.discount && (
              <>
                <span>Discount: €{parseFloat(order.discount).toFixed(2)}</span>{' '}
                <br />
              </>
            )}
            <span>
              Delivery fee: €{parseFloat(order.deliveryFee).toFixed(2)}
            </span>{' '}
            <br />
            <span>
              Total paid: €
              {amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>{' '}
            <br />
            <span>Currency: {currency.toUpperCase()}</span> <br />
            <span>
              Payment: {order.paymentIntent.status.toUpperCase()}
            </span>{' '}
            <br />
            <span>
              Ordered on:{' '}
              {moment(order.paymentIntent.created).format('MMMM Do YYYY')}
            </span>{' '}
            <br />
            <span>Order status: {order.orderStatus}</span>
          </p>
        </div>
        <div>
          <span>{order.deliverTo}</span>
          <br />
          <span>{order.deliveryAddress.firstLine}</span>
          {order.deliveryAddress.secondLine && (
            <>
              <br />
              <span>{order.deliveryAddress.secondLine}</span>
            </>
          )}
          <br />
          <span>{order.deliveryAddress.city}</span>
          <br />
          <span>{order.deliveryAddress.zip}</span>
          <br />
          <span>{order.deliveryAddress.country}</span>
        </div>
      </div> */}
    </>
  );
};

export default ShowSubscriptionInfo;
