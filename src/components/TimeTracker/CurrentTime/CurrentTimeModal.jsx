import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ConnectedCurrentTimeContent from './ConnectedCurrentTimeContent';
import useDisableBodyScroll from '../../../hooks/useDisableBodyScroll';

const CurrentTimeModal = ({ toggle, isShowing }) => {
  const modalChanges = useDisableBodyScroll();

  useEffect(() => {
    modalChanges(true);
  }, [isShowing]);

  const onModalButton = (finished) => {
    modalChanges(false);
    toggle(finished);
  };

  return (
    <ConnectedCurrentTimeContent
      onModalButton={onModalButton}
      isShowing={isShowing}
    />
  );
};
CurrentTimeModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
};

export default CurrentTimeModal;
