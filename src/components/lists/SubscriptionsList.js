import React from 'react';
import ShowSubscriptionInfo from '../cards/ShowSubscriptionInfo';

const SubscriptionsList = ({ subscriptions, searched, query }) => {
  return (
    <>
      {subscriptions.filter(searched(query)).map((subscription) => (
        <div key={subscription._id}>
          <div>
            <ShowSubscriptionInfo subscription={subscription} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SubscriptionsList;
