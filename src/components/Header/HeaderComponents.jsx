import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/logo.png';

export const LogoComponent = () => (
  <div className="lg:w-0 lg:flex-1">
    <div className="flex">
      <Link to="/">
        <img
          className="h-16 w-auto sm:h-20"
          src={Logo}
          alt="Productivity Hub"
        />
      </Link>
    </div>
  </div>
);

export const MenuButton = ({ onClickAction }) => (
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

export const ExitButton = ({ onClickAction }) => (
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
