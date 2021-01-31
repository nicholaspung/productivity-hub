import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAnonymous as isAnonymousSelector } from '../../redux/selectors/userSelectors';
import { linkAnonymousAccountToGoogle } from '../../firebase/utils';
import { loggedIn as loggedInAction } from '../../redux/actions/userActions';

const AnonymousUserMessage = ({ isAnonymous, loggedIn }) => {
  if (!isAnonymous) return null;

  return (
    <button
      type="button"
      onClick={() => linkAnonymousAccountToGoogle(loggedIn)}
      className="w-full text-center p-2 bg-indigo-600 text-white"
    >
      <p>
        Hey, you are using a guest account.
        <span className="font-bold"> Click here </span>
        if you want to link this to your Google account.
      </p>
      <p>Anonymous accounts are removed every week on Sundays.</p>
    </button>
  );
};

AnonymousUserMessage.propTypes = {
  isAnonymous: PropTypes.bool.isRequired,
  loggedIn: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ isAnonymous: isAnonymousSelector(state) }),
  { loggedIn: loggedInAction },
)(AnonymousUserMessage);
