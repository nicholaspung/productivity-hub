import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FilledButton, smallerButtonClassName } from '../BaseComponents';

const HabitDelete = ({ toggle, actionFunction, backupFunction }) => (
  <>
    <div className="p-4 bg-red-500 text-white font-bold text-center">
      <p>
        Are you sure you want to delete this habit? This will also delete your
        history of dailies.
      </p>
    </div>
    <div className="px-4 pb-4">
      <p className="py-4">If not, archive this habit instead.</p>
      <div className="flex justify-around">
        <FilledButton
          action={async () => {
            await backupFunction();
            toggle();
          }}
          classes="flex-1 w-full"
        >
          Archive
        </FilledButton>
        <button
          type="button"
          className={`${smallerButtonClassName} flex-1`}
          onClick={async () => {
            await actionFunction();
            toggle();
          }}
        >
          Delete
        </button>
        <button
          onClick={toggle}
          type="button"
          className={`${smallerButtonClassName} flex-1`}
        >
          Cancel
        </button>
      </div>
    </div>
  </>
);
HabitDelete.propTypes = {
  toggle: PropTypes.func.isRequired,
  actionFunction: PropTypes.func.isRequired,
  backupFunction: PropTypes.func.isRequired,
};

export default memo(HabitDelete);
