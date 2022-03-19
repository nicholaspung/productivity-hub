import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FilledButton } from '.';
import { ReactComponent as SaveSVG } from '../../assets/icons/save.svg';

const AddItemButtons = ({
  onAddItemAction,
  MobileIconOverrideImage,
  disableMe,
  labelButtonText,
}) => (
  <>
    <FilledButton
      action={onAddItemAction}
      classes={`lg:hidden ${disableMe ? 'pointer-events-none' : ''}`}
    >
      {MobileIconOverrideImage ? (
        <MobileIconOverrideImage className="w-4 h-auto" />
      ) : (
        <SaveSVG className="w-4 h-auto" />
      )}
    </FilledButton>
    <FilledButton
      action={onAddItemAction}
      classes={`hidden lg:inline-flex ${
        disableMe ? 'pointer-events-none' : ''
      }`}
    >
      {labelButtonText}
    </FilledButton>
  </>
);

AddItemButtons.propTypes = {
  onAddItemAction: PropTypes.func.isRequired,
  MobileIconOverrideImage: PropTypes.object,
  disableMe: PropTypes.bool.isRequired,
  labelButtonText: PropTypes.string.isRequired,
};

export default memo(AddItemButtons);
