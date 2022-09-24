import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentSubscriber } from '../../functions/auth';

const SubscriberRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentSubscriber(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log('SUBSCRIBER ROUTE ERR', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok && <Route {...rest} />;
};

export default SubscriberRoute;
