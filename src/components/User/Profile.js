import React, { useState } from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserApps } from "./redux/selectors";
import { deleteUser } from "../../firebase/utils";

const Profile = ({ userInfo, apps }) => {
  const [userApps, setUserApps] = useState(apps);
  const enableApp = (event) =>
    setUserApps({ ...userApps, [event.target.id]: event.target.checked });

  return (
    <main>
      <h1>Profile</h1>
      <p>Account: {userInfo.uid.slice(0, 10)}...</p>
      <h2>Tools</h2>
      <ul>
        <li>
          <input
            type="checkbox"
            id="habitTracker"
            onClick={(event) => enableApp(event)}
          />
          <label htmlFor="habitTracker">Habit Tracker</label>
        </li>
      </ul>
      <button>Save</button>
      <button>Cancel</button>
      <button onClick={deleteUser}>Delete Account</button>
    </main>
  );
};

export default connect((state) => ({
  userInfo: getUserInfo(state),
  apps: getUserApps(state),
}))(Profile);
