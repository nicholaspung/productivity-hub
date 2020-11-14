import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getUserInfo,
  getUserApps,
  getUserAnalytics as getUserAnalyticsSelector,
} from '../../redux/selectors/userSelectors';
import {
  addApp as addAppAction,
  getUserAnalytics as getUserAnalyticsAction,
} from '../../redux/actions/userActions';
import { DisplayContainerCard, Button, FilledButton } from '../BaseComponents';
import Helmet from '../BaseComponents/Helmet';
import DeleteAccount from './DeleteAccount';
import {
  userAnalyticDates,
  userAnalyticsWithFrequenciesForDate,
  displayDateTransform,
} from '../../utils/userUtils';

const APPS = ['HABIT_TRACKER', 'POST_SAVER'];

const Profile = ({
  userInfo,
  apps,
  addApp,
  userAnalytics,
  getUserAnalytics,
}) => {
  const defaultApps = apps.split(',');

  const [userApps, setUserApps] = useState(defaultApps);

  useEffect(() => {
    getUserAnalytics();
  }, [getUserAnalytics]);

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
  const onProfileSave = () => addApp(userInfo.userId, userApps.join(','));

  return (
    <>
      <Helmet
        title="Your Profile"
        name="Profile page"
        content="This is where you see your account data."
      />
      <DisplayContainerCard>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p>
          <strong>Account:</strong>
          {userInfo.uid.slice(0, 10)}
          ...
        </p>
      </DisplayContainerCard>
      <DisplayContainerCard classes="hidden md:block">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left underline">Label/Date</th>
              {userAnalyticDates(userAnalytics).map((date) => (
                <th key={date} className="text-center underline">
                  {displayDateTransform(date)}
                </th>
              ))}
              <th className="text-right underline">Action</th>
            </tr>
          </thead>
          <tbody>
            {userAnalyticsWithFrequenciesForDate(userAnalytics).map(
              (analytic) => (
                <tr key={analytic.id}>
                  <td className="text-left">{analytic.label}</td>
                  {Object.keys(analytic.frequencies).map((frequencyObj) => (
                    <td key={frequencyObj} className="text-center">
                      {analytic.frequencies[frequencyObj]}
                    </td>
                  ))}
                  <td className="text-right">{analytic.action}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </DisplayContainerCard>
      <DisplayContainerCard>
        <h2 className="text-2xl font-bold">Tools</h2>
        <div>
          <h2 className="text-xl font-bold">Apps</h2>
          <ul>
            {APPS.map((app) => (
              <li key={app}>
                <label htmlFor={app} style={{ textTransform: 'capitalize' }}>
                  <input
                    id={app}
                    className="mr-2 leading-tight"
                    type="checkbox"
                    checked={userApps.indexOf(app) !== -1}
                    onChange={(event) => onCheckboxChange(event, app)}
                  />
                  <span className="text-sm">
                    {app.replace(/_/, ' ').toLowerCase()}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </DisplayContainerCard>
      <DisplayContainerCard>
        <FilledButton action={onProfileSave} classes="w-full flex">
          Save
        </FilledButton>
        <div className="w-full flex justify-center p-2">
          <Button action={onProfileCancel} classes="w-full">
            Cancel
          </Button>
        </div>
      </DisplayContainerCard>
      <DeleteAccount />
    </>
  );
};

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  apps: PropTypes.string.isRequired,
  addApp: PropTypes.func.isRequired,
  userAnalytics: PropTypes.array.isRequired,
  getUserAnalytics: PropTypes.func.isRequired,
};
export default connect(
  (state) => ({
    userInfo: getUserInfo(state),
    apps: getUserApps(state),
    userAnalytics: getUserAnalyticsSelector(state),
  }),
  { addApp: addAppAction, getUserAnalytics: getUserAnalyticsAction },
)(Profile);
