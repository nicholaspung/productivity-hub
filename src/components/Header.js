import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signInWithGoogle } from "../firebase/utils";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
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
          <li onClick={() => setShowLogin(!showLogin)}>
            <div>
              <p>Login</p>
              {showLogin && (
                <>
                  <button onClick={signInWithGoogle}>Google Login</button>
                  <button>Guest Login</button>
                  <p onClick={() => setShowLogin(!showLogin)}>Hide</p>
                </>
              )}
            </div>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
