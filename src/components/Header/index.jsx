import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  logIn as logInAction,
  updateApps as updateAppsAction,
  loggedIn as loggedInAction,
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
import { LogoComponent, MenuButton } from './HeaderComponents';
import {
  NavItems,
  TopMobileNavItems,
  BottomMobileNavItems,
} from './HeaderNavItem';
import { UserActions, MobileUserActions } from './HeaderActions';
import { clearRedux as clearReduxAction } from '../../redux/actions/baseActions';

const Header = ({
  isLoggedIn,
  updateApps,
  loggedIn,
  initialLoad,
  hasError,
  logIn,
  isUserLoading,
  getUserAnalytics,
  clearRedux,
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
        clearRedux();
      },
      () => initialLoad(),
    );
  }, [loggedIn, updateApps, initialLoad, getUserAnalytics, clearRedux]);

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
  initialLoad: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  getUserAnalytics: PropTypes.func.isRequired,
  clearRedux: PropTypes.func.isRequired,
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
    initialLoad: initialLoadAction,
    logIn: logInAction,
    getUserAnalytics: getUserAnalyticsAction,
    clearRedux: clearReduxAction,
  },
)(Header);
