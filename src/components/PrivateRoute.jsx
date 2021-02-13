import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  isLoggedIn as isLoggedInSelector,
  isUserLoading as isUserLoadingSelector,
} from '../redux/selectors/userSelectors';
import PrivateRouteLoadingScreen from './PrivateRouteLoadingScreen';

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  isUserLoading,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn && !isUserLoading) return <Component {...props} />;
      if (isUserLoading) return <PrivateRouteLoadingScreen />;
      return <Redirect to="/" />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  isLoggedIn: isLoggedInSelector(state),
  isUserLoading: isUserLoadingSelector(state),
}))(PrivateRoute);
