import React, { useState } from 'react';
import { Tabs } from 'antd';
import moment from 'moment';
import Invoice from '../../components/cards/Invoice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RefundRequest from '../modals/RefundRequest';
import RefundResponse from '../modals/RefundResponse';

const { TabPane } = Tabs;

const SingleOrder = ({ order, loadUserOrders }) => {
  const [requestRefundModalIsOpen, setRequestRefundModalIsOpen] =
    useState(false);
  const [responseRefundModalIsOpen, setResponseRefundModalIsOpen] =
    useState(false);
  const [currentOrder, setCurrentOrder] = useState({});

  const { orderStatus, deliverTo, discount, deliveryFee } = order;
  const { id, amount, status, created } = order.paymentIntent;
  const { firstLine, secondLine, city, state, zip, country } =
    order.deliveryAddress;

  const requestRefund = (order) => {
    setCurrentOrder(order);
    setRequestRefundModalIsOpen(true);
  };

  return (
    <div className='order-summary'>
      <Tabs type='card' centered>
        <TabPane tab='Order Info' key='1'>
          <div className='order-info'>
            <div className='order-line'>
              <span className='order-title'>Order ID: </span>
              <span className='order-detail'>{id}</span>
            </div>
            {discount && (
              <div className='order-line'>
                <span className='order-title'>Discount: </span>
                <span className='order-detail'>
                  €{parseFloat(discount).toFixed(2)}
                </span>
              </div>
            )}
            <div className='order-line'>
              <span className='order-title'>Delivery fee: </span>
              <span className='order-detail'>
                €{parseFloat(deliveryFee).toFixed(2)}
              </span>
            </div>
            <div className='order-line'>
              <span className='order-title'>Total paid: </span>
              <span className='order-detail'>
                €
                {amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
            <div className='order-line'>
              <span className='order-title'>Payment: </span>
              <span className='order-detail'>{status.toUpperCase()}</span>
            </div>
            <div className='order-line'>
              <span className='order-title'>Ordered on: </span>
              <span className='order-detail'>
                {moment(created).format('MMMM Do YYYY')}
              </span>
            </div>
            <div className='order-line'>
              <span className='order-title'>Order status: </span>
              <span className='order-detail'>{orderStatus}</span>
            </div>
            {moment().subtract(2, 'weeks').isSameOrBefore(created) && (
              <div className='order-line'>
                <span
                  className='order-title'
                  style={{ cursor: 'pointer' }}
                  onClick={() => requestRefund(order)}
                >
                  Request refund?
                </span>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab='Your Info' key='2'>
          <div className='order-info'>
            <div className='order-line'>
              <span className='order-title'>Deliver to: </span>
              <span className='order-detail'>{deliverTo}</span>
            </div>
            <div className='order-line'>
              <span className='order-title'>Delivery address: </span>
              <div className='order-detail'>
                <span>{firstLine}</span>
                <br />
                <span>{secondLine}</span>
                <br />
                <span>{city}</span>
                <br />
                <span>{state}</span>
                <br />
                <span>{zip}</span>
                <br />
                <span>{country}</span>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab='Product Info' key='3'>
          <table className='product-info'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((p, i) => (
                <tr key={i}>
                  <td>{p.product.title}</td>
                  <td>{p.product.price}</td>
                  <td>{p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName='invoice.pdf'
            className='submit-btn pdf'
          >
            Download PDF Invoice
          </PDFDownloadLink>
        </TabPane>
      </Tabs>
      <RefundRequest
        requestRefundModalIsOpen={requestRefundModalIsOpen}
        setRequestRefundModalIsOpen={setRequestRefundModalIsOpen}
        setResponseRefundModalIsOpen={setResponseRefundModalIsOpen}
        currentOrder={currentOrder}
        loadUserOrders={loadUserOrders}
      />
      <RefundResponse
        responseRefundModalIsOpen={responseRefundModalIsOpen}
        setResponseRefundModalIsOpen={setResponseRefundModalIsOpen}
      />
    </div>
  );
};

export default SingleOrder;
