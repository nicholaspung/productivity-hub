import React from 'react';
import PropTypes from 'prop-types';
import CurrentTimeModal from './CurrentTimeModal';
import ConnectedCurrentTimeContent from './ConnectedCurrentTimeContent';
import Modal from '../../BaseComponents/Modal';

const CurrentTrackTime = ({
  showCurrentTrackTimeModal,
  setShowCurrentTrackTimeModal,
  setShowCurrentTrackTimeBox,
  showCurrentTrackTimeBox,
}) => (
  <>
    <Modal
      isShowing={showCurrentTrackTimeModal}
      toggle={(finished) => {
        if (finished) {
          setShowCurrentTrackTimeBox(false);
        } else {
          setShowCurrentTrackTimeBox(true);
        }
        setShowCurrentTrackTimeModal(false);
      }}
      Component={CurrentTimeModal}
    />
    {!showCurrentTrackTimeModal && showCurrentTrackTimeBox && (
      <div className="bg-gray-100 rounded-md border-2 border-gray-200 mx-8 flex justify-center">
        <div className="bg-white w-full md:w-3/4 md:border-l-2 md:border-r-2 border-gray-200">
          <ConnectedCurrentTimeContent
            onModalButton={(finished) => {
              if (finished) {
                setShowCurrentTrackTimeBox(false);
              } else {
                setShowCurrentTrackTimeModal(true);
              }
            }}
          />
        </div>
      </div>
    )}
  </>
);
CurrentTrackTime.propTypes = {
  showCurrentTrackTimeModal: PropTypes.bool.isRequired,
  setShowCurrentTrackTimeModal: PropTypes.func.isRequired,
  setShowCurrentTrackTimeBox: PropTypes.func.isRequired,
  showCurrentTrackTimeBox: PropTypes.bool.isRequired,
};

export default CurrentTrackTime;
