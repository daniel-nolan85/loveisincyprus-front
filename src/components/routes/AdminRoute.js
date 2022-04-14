import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log('ADMIN ROUTE ERR', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok && <Route {...rest} />;
};

export default AdminRoute;
