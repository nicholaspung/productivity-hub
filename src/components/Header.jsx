import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../assets/icons/logo.png';
import {
  logIn as logInAction,
  updateApps as updateAppsAction,
  loggedIn as loggedInAction,
  logOut as logOutAction,
  initialLoad as initialLoadAction,
} from './User/redux/actions';
import {
  isLoggedIn as isLoggedInSelector,
  isUserLoading as isUserLoadingSelector,
} from './User/redux/selectors';
import {
  signInWithGoogle,
  signInAnonymously,
  signOut,
  onAuthStateChange,
} from '../firebase/utils';
import { getProfile } from './User/api';
import { Button, FilledButton } from './BaseComponents';
import { ReactComponent as LoadingSVG } from '../assets/icons/loading.svg';

const Header = ({ isLoggedIn, updateApps, loggedIn, logOut, initialLoad }) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    onAuthStateChange(
      async (authUser) => {
        const { data } = await getProfile();
        const { apps, user: userId } = data;
        const updatedAuthUser = { ...authUser, userId };
        loggedIn(updatedAuthUser);
        updateApps(apps);
      },
      () => {
        logOut();
      },
      () => initialLoad(),
    );
  }, [loggedIn, logOut, updateApps, initialLoad]);

  //  { link: "/", label: "", icons: "" }
  const navItems = isLoggedIn
    ? [
        { link: '/habit-tracker', label: 'Habit Tracker', icons: '' },
        { link: '/post-saver', label: 'Post Saver', icons: '' },
        { link: '/profile', label: 'Profile', icons: '' },
      ]
    : [];
  const navSubItems = [];

  return (
    <header className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <div className="flex">
              <LogoComponent />
            </div>
          </div>
          <MenuButton onClickAction={() => setShowMenu(!showMenu)} />
          <NavItems data={navItems} />
          <UserActions />
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
              <BottomMobileNavItems data={navSubItems} />
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
};

export default connect(
  (state) => ({
    isLoggedIn: isLoggedInSelector(state),
  }),
  {
    updateApps: updateAppsAction,
    loggedIn: loggedInAction,
    logOut: logOutAction,
    initialLoad: initialLoadAction,
  },
)(Header);

const LogoComponent = () => (
  <Link to="/">
    <img className="h-16 w-auto sm:h-20" src={Logo} alt="Productivity Hub" />
  </Link>
);

const MenuButton = ({ onClickAction }) => (
  <div className="-mr-2 -my-2 md:hidden">
    <button
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
      onClick={onClickAction}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
);
MenuButton.propTypes = {
  onClickAction: PropTypes.func.isRequired,
};

const ExitButton = ({ onClickAction }) => (
  <div className="-mr-2">
    <button
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
      onClick={onClickAction}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);
ExitButton.propTypes = {
  onClickAction: PropTypes.func.isRequired,
};

const NavItems = ({ data = [] }) => (
  <nav className="hidden md:flex space-x-10">
    {data.map((item) => (
      <Link
        key={item.label}
        to={item.link}
        className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
      >
        {item.label}
      </Link>
    ))}
  </nav>
);
NavItems.propTypes = {
  data: PropTypes.array,
};
NavItems.defaultProps = {
  data: [],
};

const TopMobileNavItems = ({ data = [], onClickAction }) => (
  <div className="pt-5 pb-6 px-5 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <img className="h-16 w-auto" src={Logo} alt="Workflow" />
      </div>
      <ExitButton onClickAction={onClickAction} />
    </div>
    <div>
      <nav className="grid gap-y-8">
        {data.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
            onClick={onClickAction}
          >
            {item.icon && item.icon}
            <div className="text-base leading-6 font-medium text-gray-900">
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  </div>
);
TopMobileNavItems.propTypes = {
  data: PropTypes.array,
  onClickAction: PropTypes.func.isRequired,
};
TopMobileNavItems.defaultProps = {
  data: [],
};

const BottomMobileNavItems = ({ data = [] }) => (
  <div className="py-6 px-5 space-y-6">
    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
      {data.map((item) => (
        <a
          href={item.link}
          className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"
        >
          {item.label}
        </a>
      ))}
    </div>
    <MobileUserActions />
  </div>
);
BottomMobileNavItems.propTypes = {
  data: PropTypes.array,
};
BottomMobileNavItems.defaultProps = {
  data: [],
};

const UserActions = connect(
  (state) => ({
    isLoggedIn: isLoggedInSelector(state),
    isUserLoading: isUserLoadingSelector(state),
  }),
  { logIn: logInAction },
)(({ logIn, isLoggedIn, isUserLoading }) => (
  <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
    {isUserLoading && (
      <LoadingSVG className="w-6 h-auto animate-spin absolute" />
    )}
    {!isLoggedIn && !isUserLoading && (
      <>
        <Button action={() => logIn(signInWithGoogle)}>Sign in</Button>
        <FilledButton action={() => logIn(signInWithGoogle)}>
          Sign up
        </FilledButton>
        <FilledButton action={() => logIn(signInAnonymously)}>
          Guest sign in
        </FilledButton>
      </>
    )}
    {isLoggedIn && <FilledButton action={signOut}>Sign out</FilledButton>}
  </div>
));

const MobileUserActions = connect(
  (state) => ({
    isLoggedIn: isLoggedInSelector(state),
    isUserLoading: isUserLoadingSelector(state),
  }),
  { logIn: logInAction },
)(({ logIn, isLoggedIn, isUserLoading }) => (
  <div className="space-y-6">
    {isUserLoading && (
      <LoadingSVG className="w-6 h-auto animate-spin absolute" />
    )}
    {!isLoggedIn && !isUserLoading && (
      <>
        <FilledButton
          action={() => logIn(signInWithGoogle)}
          classes="w-full flex"
        >
          Sign up
        </FilledButton>
        <FilledButton
          action={() => logIn(signInAnonymously)}
          classes="w-full flex"
        >
          Guest sign in
        </FilledButton>
        <p className="text-center text-base leading-6 font-medium text-gray-500">
          <span>Existing user? </span>
          <button
            className="text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150 font-medium"
            onClick={() => logIn(signInWithGoogle)}
            type="button"
          >
            Sign in
          </button>
        </p>
      </>
    )}
    {isLoggedIn && (
      <FilledButton classes="w-full flex" action={signOut}>
        Sign out
      </FilledButton>
    )}
  </div>
));
