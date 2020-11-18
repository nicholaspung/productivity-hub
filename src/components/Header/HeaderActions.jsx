import React from 'react';
import PropTypes from 'prop-types';
import {
  signInWithGoogle,
  signInAnonymously,
  signOut,
} from '../../firebase/utils';
import { Button, FilledButton } from '../BaseComponents';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';

export const UserActions = ({
  logIn,
  isLoggedIn,
  isUserLoading,
  children = '',
}) => (
  <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
    {children}
    {isUserLoading && (
      <LoadingSVG className="w-6 h-auto animate-spin absolute" />
    )}
    {!isLoggedIn && !isUserLoading && (
      <>
        <Button action={() => logIn(signInWithGoogle)}>Sign in</Button>
        <FilledButton action={() => logIn(signInWithGoogle)}>
          Sign up
        </FilledButton>
        <FilledButton action={() => logIn(signInAnonymously)}>
          Guest sign in
        </FilledButton>
      </>
    )}
    {isLoggedIn && <FilledButton action={signOut}>Sign out</FilledButton>}
  </div>
);
UserActions.propTypes = {
  logIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
};

export const MobileUserActions = ({ logIn, isLoggedIn, isUserLoading }) => (
  <>
    {isUserLoading && (
      <div className="flex justify-center">
        <LoadingSVG className="w-6 h-auto animate-spin relative" />
      </div>
    )}
    <div className="space-y-6">
      {!isLoggedIn && !isUserLoading && (
        <>
          <FilledButton
            action={() => logIn(signInWithGoogle)}
            classes="w-full flex"
          >
            Sign up
          </FilledButton>
          <FilledButton
            action={() => logIn(signInAnonymously)}
            classes="w-full flex"
          >
            Guest sign in
          </FilledButton>
          <p className="text-center text-base leading-6 font-medium text-gray-500">
            <span>Existing user? </span>
            <button
              className="text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150 font-medium"
              onClick={() => logIn(signInWithGoogle)}
              type="button"
            >
              Sign in
            </button>
          </p>
        </>
      )}
      {isLoggedIn && (
        <FilledButton classes="w-full flex" action={signOut}>
          Sign out
        </FilledButton>
      )}
    </div>
  </>
);
MobileUserActions.propTypes = {
  logIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
};
