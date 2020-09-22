import React, { useState } from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserApps } from "./redux/selectors";
import { deleteUser } from "../../firebase/utils";
import { addApp as addAppAction } from "./redux/actions";

const APPS = ["HABIT_TRACKER", "POST_SAVER"];

const Profile = ({ userInfo, apps, addApp }) => {
  const [userApps, setUserApps] = useState(apps.split(","));

  const onCheckboxChange = (event, app) => {
    let userAppsCopy = [...userApps];
    if (!event.target.checked) {
      userAppsCopy.splice(userApps.indexOf(app), 1);
    } else {
      userAppsCopy.push(event.target.id);
    }
    userAppsCopy = userAppsCopy.filter((word) => word);
    setUserApps(userAppsCopy);
    addApp(userInfo.userId, userAppsCopy.join(","));
  };

  return (
    <main>
      <h1>Profile</h1>
      <p>Account: {userInfo.uid.slice(0, 10)}...</p>
      <h2>Tools</h2>
      <ul>
        {APPS.map((app) => (
          <li key={app}>
            <input
              id={app}
              type="checkbox"
              checked={userApps.indexOf(app) !== -1}
              onChange={(event) => onCheckboxChange(event, app)}
            />
            <label htmlFor={app} style={{ textTransform: "capitalize" }}>
              {app.replace(/_/, " ").toLowerCase()}
            </label>
          </li>
        ))}
      </ul>
      <button>Save</button>
      <button>Cancel</button>
      <button onClick={deleteUser}>Delete Account</button>
    </main>
  );
};

export default connect(
  (state) => ({
    userInfo: getUserInfo(state),
    apps: getUserApps(state),
  }),
  { addApp: addAppAction }
)(Profile);
