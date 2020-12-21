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
import UserAnalyticRow from './UserAnalyticRow';

const APPS = [
  { title: 'Habit Tracker', id: 1 },
  { title: 'Post Saver', id: 2 },
];

const Profile = ({
  userInfo,
  apps,
  addApp,
  userAnalytics,
  getUserAnalytics,
}) => {
  const [userApps, setUserApps] = useState(apps);

  useEffect(() => {
    getUserAnalytics();
  }, [getUserAnalytics]);

  const onCheckboxChange = (event, appId) => {
    const userAppsCopy = [...userApps];
    if (!event.target.checked) {
      userAppsCopy.splice(userApps.indexOf(appId), 1);
    } else {
      userAppsCopy.push(event.target.id);
    }
    setUserApps(userAppsCopy.map((id) => Number(id)));
  };
  const onProfileCancel = () => setUserApps(apps);
  const onProfileSave = () => addApp(userInfo.profileId, userApps);

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
              <th className="text-center underline w-1/12">Threshold</th>
              <th className="text-center underline">Action</th>
            </tr>
          </thead>
          <tbody>
            {userAnalyticsWithFrequenciesForDate(userAnalytics).map(
              (analytic) => (
                <UserAnalyticRow key={analytic.id} analytic={analytic} />
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
  apps: PropTypes.array.isRequired,
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
