import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const { token } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (token) {
      currentAdmin(token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, [token]);

  return ok && <Route {...rest} />;
};

export default AdminRoute;
