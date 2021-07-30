import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ConnectedCurrentTrackTimeContent from './ConnectedCurrentTrackTimeContent';
import useDisableBodyScroll from '../../../hooks/useDisableBodyScroll';

const CurrentTrackTimeModal = ({ toggle, isShowing }) => {
  const modalChanges = useDisableBodyScroll();

  useEffect(() => {
    modalChanges(true);
  }, [isShowing]);

  const onModalButton = (finished) => {
    modalChanges(false);
    toggle(finished);
  };

  return (
    <ConnectedCurrentTrackTimeContent
      onModalButton={onModalButton}
      isShowing={isShowing}
    />
  );
};
CurrentTrackTimeModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
};

export default CurrentTrackTimeModal;
