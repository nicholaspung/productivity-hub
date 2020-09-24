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
  updateApps as updateAppsAction,
} from "./User/redux/actions";
import { getProfile } from "./User/api";

const Header = ({
  isLoggedIn,
  isLoading,
  logIn,
  loggedIn,
  logOut,
  updateApps,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    onAuthStateChange(
      async (authUser) => {
        const { data } = await getProfile();
        const { apps, user: userId } = data;
        authUser.userId = userId;
        loggedIn(authUser);
        updateApps(apps);
      },
      () => {
        logOut();
      }
    );
  }, [loggedIn, logOut, updateApps]);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Logo</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/habit-tracker">Habit Tracker</Link>
              </li>
              <li>
                <Link to="/post-saver">Post Saver</Link>
              </li>
            </>
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
    updateApps: updateAppsAction,
  }
)(Header);
