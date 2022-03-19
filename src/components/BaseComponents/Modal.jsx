import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Can be made better, don't have the energy to think how right now

const Modal = ({ isShowing, toggle, Component, data, ...rest }) => {
  if (!isShowing) return null;

  return ReactDOM.createPortal(
    <div className="fixed z-20 inset-0 overflow-y-auto">
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
          <Component
            toggle={toggle}
            data={data}
            isShowing={isShowing}
            {...rest}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};
Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  Component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]).isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default memo(Modal);
