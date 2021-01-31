import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn as isLoggedInSelector } from '../redux/selectors/userSelectors';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn) return <Component {...props} />;
      return <Redirect to="/" />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect((state) => ({ isLoggedIn: isLoggedInSelector(state) }))(
  PrivateRoute,
);
