import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInfo, getUserApps } from '../../redux/selectors/userSelectors';
import { addApp as addAppAction } from '../../redux/actions/userActions';
import { DisplayContainerCard, Button, FilledButton } from '../BaseComponents';
import Helmet from '../BaseComponents/Helmet';
import DeleteAccount from './DeleteAccount';
import Apps from './Apps';
import UserAnalytics from './UserAnalytics';
import { appSelectionUtil } from '../../utils/userUtils';

const Profile = ({ userInfo, apps, addApp }) => {
  const [userApps, setUserApps] = useState([...apps]);

  const onCheckboxChange = (event, app) =>
    setUserApps(appSelectionUtil(event, app, userApps));
  const onProfileCancel = () => setUserApps(apps);
  const onProfileSave = () =>
    addApp(
      userInfo.profileId,
      userApps.map((app) => app.id),
    );

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
          <strong>Email: </strong>
          {userInfo.email}
        </p>
      </DisplayContainerCard>
      <DisplayContainerCard classes="hidden md:block">
        <UserAnalytics />
      </DisplayContainerCard>
      <DisplayContainerCard>
        <h2 className="text-2xl font-bold">Tools</h2>
        <Apps userApps={userApps} onCheckboxChange={onCheckboxChange} />
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
};
export default connect(
  (state) => ({
    userInfo: getUserInfo(state),
    apps: getUserApps(state),
  }),
  { addApp: addAppAction },
)(Profile);
