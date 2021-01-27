import React from 'react';
import PropTypes from 'prop-types';

// Check out /api/apps for latest apps
const APPS = [
  { title: 'Habit Tracker', id: 1 },
  { title: 'Post Saver', id: 2 },
  { title: 'Vices', id: 3 },
];

const Apps = ({ userApps, onCheckboxChange }) => (
  <div>
    <h2 className="text-xl font-bold">Apps</h2>
    <p className="text-sm text-gray-500 ">
      *You must always have 1 app connected.
    </p>
    <ul>
      {APPS.map((app) => (
        <li key={app.id}>
          <label htmlFor={app.id} style={{ textTransform: 'capitalize' }}>
            <input
              id={app.id}
              className="mr-2 leading-tight"
              type="checkbox"
              checked={userApps.indexOf(app.id) !== -1}
              onChange={(event) => onCheckboxChange(event, app.id)}
            />
            <span className="text-sm">{app.title}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

Apps.propTypes = {
  userApps: PropTypes.array.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Apps;
