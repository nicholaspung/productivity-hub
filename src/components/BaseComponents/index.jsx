import React from 'react';
import PropTypes from 'prop-types';

export const Main = ({ children }) => (
  <main className="relative bg-white">{children}</main>
);
Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export const DisplayContainer = ({ children, classes = '' }) => (
  <div className={`max-w-6xl mx-auto p-4 sm:px-6 ${classes || ''}`}>
    {children}
  </div>
);
DisplayContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  classes: PropTypes.string,
};

export const DisplayContainerCard = ({ children, classes = '' }) => (
  <DisplayContainer classes={classes || ''}>
    <div className="p-5 rounded-md border-2 border-gray-200">{children}</div>
  </DisplayContainer>
);
DisplayContainerCard.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  classes: PropTypes.string,
};

export const Button = ({ children, action, classes = '' }) => (
  <button
    className={`whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
      classes || ''
    }`}
    onClick={action}
    type="button"
  >
    {children}
  </button>
);
Button.propTypes = {
  children: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  classes: PropTypes.string,
  action: PropTypes.func.isRequired,
};

export const FilledButton = ({ children, action, classes = '' }) => (
  <span className={`inline-flex rounded-md shadow-sm ${classes || ''}`}>
    <button
      className={`whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 ${
        classes || ''
      }`}
      onClick={action}
      type="button"
    >
      {children}
    </button>
  </span>
);
FilledButton.propTypes = {
  children: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  classes: PropTypes.string,
  action: PropTypes.func.isRequired,
};

export const Modal = ({ children }) => (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75" />
    </div>
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {children}
      </div>
    </div>
  </div>
);
Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export const smallerButtonClassName =
  'whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900';

export const smallerFilledButtonClassName =
  'py-1 px-5 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150';

export const smallerFormInputClassName =
  'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

export const formInputClassName =
  'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

export const fixedDisplayContainer =
  'mb-4 p-4 sm:px-6 rounded-md border-2 border-gray-200';

export const overflowDisplayContainer =
  'my-2 overflow-auto p-4 rounded-md border-2 border-gray-200 h-screen';
