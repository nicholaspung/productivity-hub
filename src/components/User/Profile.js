import React from "react";

const Profile = () => (
  <main>
    <h1>Profile</h1>
    <p>Account: </p>
    <h2>Tools</h2>
    <ul>
      <li>
        <input type="checkbox" id="habit-tracker" />
        <label htmlFor="habit-tracker">Habit Tracker</label>
      </li>
    </ul>
    <button>Save</button>
    <button>Cancel</button>
    <button>Delete Account</button>
  </main>
);

export default Profile;
