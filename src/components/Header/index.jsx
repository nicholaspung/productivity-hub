import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  logIn as logInAction,
  updateApps as updateAppsAction,
  loggedIn as loggedInAction,
  logOut as logOutAction,
  initialLoad as initialLoadAction,
  getUserAnalytics as getUserAnalyticsAction,
} from '../../redux/actions/userActions';
import {
  isLoggedIn as isLoggedInSelector,
  isUserLoading as isUserLoadingSelector,
  hasError as hasErrorSelector,
} from '../../redux/selectors/userSelectors';
import { onAuthStateChange } from '../../firebase/utils';
import { createUserAnalytics } from '../../api/baseApi';
import { clearHabitTracker as clearHabitTrackerAction } from '../../redux/actions/habitTrackerActions';
import { clearPostSaver as clearPostSaverAction } from '../../redux/actions/postSaverActions';
import { clearVices as clearVicesAction } from '../../redux/actions/vicesActions';
import { LogoComponent, MenuButton } from './HeaderComponents';
import {
  NavItems,
  TopMobileNavItems,
  BottomMobileNavItems,
} from './HeaderNavItem';
import { UserActions, MobileUserActions } from './HeaderActions';

const Header = ({
  isLoggedIn,
  updateApps,
  loggedIn,
  logOut,
  initialLoad,
  clearHabitTracker,
  clearPostSaver,
  clearVices,
  hasError,
  logIn,
  isUserLoading,
  getUserAnalytics,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    onAuthStateChange(
      async (/* authUser */) => {
        await loggedIn();
        await createUserAnalytics();
        await getUserAnalytics();
      },
      () => {
        logOut();
        clearHabitTracker();
        clearPostSaver();
        clearVices();
      },
      () => initialLoad(),
    );
  }, [
    loggedIn,
    logOut,
    updateApps,
    initialLoad,
    clearHabitTracker,
    clearPostSaver,
    getUserAnalytics,
    clearVices,
  ]);

  //  { link: "/", label: "", icons: "" }
  const navItems = isLoggedIn
    ? [
        { link: '/habit-tracker', label: 'Habit Tracker', icons: '' },
        { link: '/vices', label: 'Vices', icons: '' },
      ]
    : [];
  const navSubItems = isLoggedIn
    ? [{ link: '/profile', label: 'Profile', icons: '' }]
    : [];

  return (
    <header className="bg-white w-full border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center md:justify-start md:space-x-10">
          <LogoComponent />
          <MenuButton onClickAction={() => setShowMenu(!showMenu)} />
          <NavItems data={navItems} />
          {!hasError && (
            <UserActions
              logIn={logIn}
              isLoggedIn={isLoggedIn}
              isUserLoading={isUserLoading}
            >
              <NavItems data={navSubItems} />
            </UserActions>
          )}
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
          <div className="rounded-lg shadow-lg">
            <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
              <TopMobileNavItems
                onClickAction={() => setShowMenu(!showMenu)}
                data={navItems}
              />
              <BottomMobileNavItems
                data={navSubItems}
                onClickAction={() => setShowMenu(!showMenu)}
              >
                {!hasError && (
                  <MobileUserActions
                    logIn={logIn}
                    isLoggedIn={isLoggedIn}
                    isUserLoading={isUserLoading}
                  />
                )}
              </BottomMobileNavItems>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateApps: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  initialLoad: PropTypes.func.isRequired,
  clearHabitTracker: PropTypes.func.isRequired,
  clearPostSaver: PropTypes.func.isRequired,
  clearVices: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  getUserAnalytics: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isLoggedIn: isLoggedInSelector(state),
    hasError: hasErrorSelector(state),
    isUserLoading: isUserLoadingSelector(state),
  }),
  {
    updateApps: updateAppsAction,
    loggedIn: loggedInAction,
    logOut: logOutAction,
    initialLoad: initialLoadAction,
    clearHabitTracker: clearHabitTrackerAction,
    clearPostSaver: clearPostSaverAction,
    clearVices: clearVicesAction,
    logIn: logInAction,
    getUserAnalytics: getUserAnalyticsAction,
  },
)(Header);
