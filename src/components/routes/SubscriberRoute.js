import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentSubscriber } from '../../functions/auth';

const SubscriberRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const { token } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (token) {
      currentSubscriber(token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log('SUBSCRIBER ROUTE ERR', err);
          setOk(false);
        });
    }
  }, [token]);

  return ok && <Route {...rest} />;
};

export default SubscriberRoute;
