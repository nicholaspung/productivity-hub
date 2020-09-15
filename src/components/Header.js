import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  signInWithGoogle,
  onAuthStateChange,
  signInAnonymously,
  signOut,
} from "../firebase/utils";

const Header = ({ isLoggedIn, isLoading }) => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    onAuthStateChange(
      (authUser) => {
        console.log(authUser);
      },
      () => {
        console.log("logged out");
      }
    );
  }, []);

  console.log(isLoggedIn, isLoading);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Logo</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/habit-tracker">Habit Tracker</Link>
          </li>
          <li>
            <div onClick={() => setShowLogin(!showLogin)}>
              <p>Login</p>
              {showLogin && (
                <>
                  <button onClick={signInWithGoogle}>Google Login</button>
                  <Link to="/habit-tracker">
                    <button onClick={signInAnonymously}>Guest Login</button>
                  </Link>
                  <p onClick={() => setShowLogin(!showLogin)}>Hide</p>
                </>
              )}
            </div>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/">
              <button onClick={signOut}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default connect(
  (state) =>
    console.log(state) || {
      isLoggedIn: Boolean(state.users.info.uid),
      isLoading: Boolean(state.users.loading),
    }
)(Header);
