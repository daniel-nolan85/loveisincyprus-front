import React from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';
import Mobile from '../../components/user/Mobile';

const AdSuccess = (props) => {
  const { card_brand, pan, exp_month, exp_year, holder } =
    props.location.state.approvedData.payment_instrument;
  const payable = props.location.state.approvedData.amount;
  const demographic = props.location.state.demographic;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='ps-card'>
          <img
            src={card_brand === 'MasterCard' ? mastercard : visa}
            className='ps-logo-card'
          />
          <div className='ps-cardinfo'>
            <div className='ps-number-expiry'>
              <div>
                <label className='ps-label'>Card number:</label>
                <span className='ps-input'>XXXX-XXXX-XXXX-{pan}</span>
              </div>
            </div>
            <div className='ps-name-cvc'>
              <div>
                <label className='ps-label'>Name:</label>
                <span className='ps-input'>{holder}</span>
              </div>
              <div>
                <label className='ps-label'>Expiry:</label>
                <span className='ps-input'>
                  {exp_month} / {exp_year}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='ps-receipt'>
          <div className='ps-col'>
            <p>Cost:</p>
            <h2 className='ps-cost'>€{payable}</h2>
          </div>
          <div className='ps-col'>
            <p>Information:</p>
            {demographic.includes('everyone') ? (
              <p className='ps-bought-items ps-description'>
                Your ad will now be displayed on our site to all visitors for{' '}
                {payable === '5.00'
                  ? 'one day.'
                  : payable === '20.00.'
                  ? 'one week.'
                  : payable === '30.00.'
                  ? 'two weeks.'
                  : 'one month.'}
              </p>
            ) : (
              <p className='ps-bought-items ps-description'>
                Your ad will now be displayed on our site for
                {payable === '5.00'
                  ? ' one day '
                  : payable === '20.00.'
                  ? ' one week '
                  : payable === '30.00.'
                  ? ' two weeks '
                  : ' one month '}
                to visitors who are:
                <ul>
                  {demographic &&
                    demographic.length > 0 &&
                    demographic.map((demo) => (
                      <li>
                        {demo === 'Male'
                          ? 'male'
                          : demo === 'Female'
                          ? 'female'
                          : demo === '18-30 year olds'
                          ? 'aged 18-30'
                          : demo === '30-45 year olds'
                          ? 'aged 30-45'
                          : demo === '45-60 year olds'
                          ? 'aged 45-60'
                          : demo === 'Over 60s'
                          ? 'aged over 60'
                          : demo === 'Ayia Napa'
                          ? 'living in Ayia Napa'
                          : demo === 'Larnaca'
                          ? 'living in Larnaca'
                          : demo === 'Limassol'
                          ? 'living in Limassol'
                          : demo === 'Nicosia'
                          ? 'living in Nicosia'
                          : demo === 'Paphos' && 'live in Paphos'}
                      </li>
                    ))}
                </ul>
              </p>
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default AdSuccess;
