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
import { ReactComponent as UserSvg } from "../assets/userprofile.svg";

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
    <header className="lg:container lg:mx-auto">
      <nav>
        <ul className="flex list-none text-center sm:text-left">
          <li className="flex-1 p-2">
            <Link to="/">Logo</Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="p-2">
                <Link to="/habit-tracker">Habit Tracker</Link>
              </li>
              <li className="p-2">
                <Link to="/post-saver">Post Saver</Link>
              </li>
            </>
          )}
          {!isLoggedIn && !isLoading && (
            <li className="p-2">
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
          {isLoading && <li className="p-2">Loading...</li>}
          {isLoggedIn && !isLoading && (
            <>
              <li className="p-2">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="p-2">
                <Link to="/">
                  <button onClick={signOut}>Logout</button>
                </Link>
              </li>
            </>
          )}
        </ul>
        <UserSvg className="w-4 h-4" />
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
