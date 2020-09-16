import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  signInWithGoogle,
  onAuthStateChange,
  signInAnonymously,
  signOut,
} from "../firebase/utils";
import {
  logIn as logInAction,
  loggedIn as loggedInAction,
  logOut as logOutAction,
} from "./User/redux/actions";

const Header = ({ isLoggedIn, isLoading, logIn, loggedIn, logOut }) => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    onAuthStateChange(
      (authUser) => {
        loggedIn(authUser);
      },
      () => {
        logOut();
      }
    );
  }, [loggedIn, logOut]);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Logo</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/habit-tracker">Habit Tracker</Link>
            </li>
          )}
          {!isLoggedIn && !isLoading && (
            <li>
              <div onClick={() => setShowLogin(!showLogin)}>
                <p>Login</p>
                {showLogin && (
                  <>
                    <button onClick={() => logIn(signInWithGoogle)}>
                      Google Login
                    </button>
                    <Link to="/habit-tracker">
                      <button onClick={() => logIn(signInAnonymously)}>
                        Guest Login
                      </button>
                    </Link>
                    <p onClick={() => setShowLogin(!showLogin)}>Hide</p>
                  </>
                )}
              </div>
            </li>
          )}
          {isLoading && <li>Loading...</li>}
          {isLoggedIn && !isLoading && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/">
                  <button onClick={signOut}>Logout</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default connect(
  (state) => ({
    isLoggedIn: Boolean(state.users.info.uid),
    isLoading: Boolean(state.users.loading),
  }),
  {
    logIn: logInAction,
    loggedIn: loggedInAction,
    logOut: logOutAction,
  }
)(Header);
