import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import User from '../models/User';

const AuthRoute = ({ component: Component, admin = false, redirect, ...rest }) => {
  const user = new User();
  const { isAdmin } = user;
  let isAuthenticated = false;

  if (!user.isUserExists()) {
    if (!admin && !isAdmin) {
      isAuthenticated = true;
    }
  } else if (isAdmin !== undefined) {
    if (admin && isAdmin) {
      isAuthenticated = true;
    } else if (!admin && !isAdmin) {
      isAuthenticated = true;
    }
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.node,
  redirect: PropTypes.string,
  admin: PropTypes.bool,
};

export default AuthRoute;
