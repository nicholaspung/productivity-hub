import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { trackSpecificEventsFromUser } from '../../api/baseApi';
import { userAnalyticLabels } from '../../constants/baseConstants';
import { ExitButton } from './HeaderComponents';
import Logo from '../../assets/icons/logo.png';

const postSaverNavAction = (item) => {
  if (item.label === 'Post Saver') {
    trackSpecificEventsFromUser(userAnalyticLabels.POST_SAVER_NAV);
  }
};

export const NavItems = ({ data = [] }) => (
  <nav className="hidden md:flex space-x-10">
    {data.map((item) => (
      <Link
        key={item.label}
        to={item.link}
        onClick={() => {
          postSaverNavAction(item);
        }}
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

export const TopMobileNavItems = ({ data = [], onClickAction }) => (
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
            onClick={() => {
              postSaverNavAction(item);
              onClickAction();
            }}
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

export const BottomMobileNavItems = ({
  data = [],
  children = '',
  onClickAction,
}) => (
  <div className="py-6 px-5 space-y-6">
    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
      {data.map((item) => (
        <Link
          key={item.link}
          to={item.link}
          onClick={onClickAction}
          className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"
        >
          {item.label}
        </Link>
      ))}
    </div>
    {children}
  </div>
);
BottomMobileNavItems.propTypes = {
  data: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  onClickAction: PropTypes.func.isRequired,
};
