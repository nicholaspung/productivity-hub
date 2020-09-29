import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn as isLoggedInSelector } from './User/redux/selectors';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default connect((state) => ({ isLoggedIn: isLoggedInSelector(state) }))(
  PrivateRoute,
);
