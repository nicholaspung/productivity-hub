import React, { useState } from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserApps } from "./redux/selectors";
import {
  addApp as addAppAction,
  deleteUser as deleteUserAction,
} from "./redux/actions";

const APPS = ["HABIT_TRACKER", "POST_SAVER"];

const Profile = ({ userInfo, apps, addApp, deleteUser }) => {
  const defaultApps = apps.split(",");
  const [userApps, setUserApps] = useState(defaultApps);

  const onCheckboxChange = (event, app) => {
    let userAppsCopy = [...userApps];
    if (!event.target.checked) {
      userAppsCopy.splice(userApps.indexOf(app), 1);
    } else {
      userAppsCopy.push(event.target.id);
    }
    userAppsCopy = userAppsCopy.filter((word) => word);
    setUserApps(userAppsCopy);
  };

  const onProfileCancel = () => setUserApps(defaultApps);
  const onProfileSave = () => addApp(userInfo.userId, userApps.join(","));
  const onDeleteUser = () => deleteUser(userInfo.userId);

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
      <button onClick={onProfileSave}>Save</button>
      <button onClick={onProfileCancel}>Cancel</button>
      <button onClick={onDeleteUser}>Delete Account</button>
    </main>
  );
};

export default connect(
  (state) => ({
    userInfo: getUserInfo(state),
    apps: getUserApps(state),
  }),
  { addApp: addAppAction, deleteUser: deleteUserAction }
)(Profile);
