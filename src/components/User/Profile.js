import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getUserInfo, getUserApps } from './redux/selectors';
import { addApp as addAppAction } from './redux/actions';
import { DisplayContainerCard, Button, FilledButton } from '../BaseComponents';
import DeleteAccount from './DeleteAccount';

const APPS = ['HABIT_TRACKER', 'POST_SAVER'];

const Profile = ({ userInfo, apps, addApp }) => {
  const defaultApps = apps.split(',');
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
  const onProfileSave = () => addApp(userInfo.userId, userApps.join(','));

  return (
    <>
      <DisplayContainerCard>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p>
          <strong>Account:</strong> {userInfo.uid.slice(0, 10)}...
        </p>
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
        <FilledButton action={onProfileSave} classes={'w-full flex'}>
          Save
        </FilledButton>
        <div className="w-full flex justify-center p-2">
          <Button action={onProfileCancel} classes={'w-full'}>
            Cancel
          </Button>
        </div>
      </DisplayContainerCard>
      <DeleteAccount />
    </>
  );
};

export default connect(
  (state) => ({
    userInfo: getUserInfo(state),
    apps: getUserApps(state),
  }),
  { addApp: addAppAction },
)(Profile);
