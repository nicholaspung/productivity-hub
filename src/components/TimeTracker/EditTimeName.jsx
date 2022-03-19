import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTrackTimeName as updateTrackTimeNameAction } from '../../redux/actions/timeTrackerActions';
import { formInputClassName, FilledButton, Button } from '../BaseComponents';

const EditTimeName = ({ toggle, data, updateTrackTimeName }) => {
  const [name, setName] = useState(data.name);
  const [nameError, setNameError] = useState('');

  const onNameChange = (event) => setName(event.target.value);
  const onSaveAction = async (e) => {
    e.preventDefault();
    if (!name) {
      setNameError('Required');
    }
    await updateTrackTimeName(data.id, { name });
    toggle();
  };

  return (
    <form className="p-4">
      <h1 className="text-2xl px-5 font-bold">Edit Track Time Name</h1>
      <label htmlFor="vice-name">
        <span className="w-full uppercase text-xs">
          Name
          {nameError && <span className="text-red-500 pl-1">{nameError}</span>}
        </span>
        <input
          id="vice-name"
          type="text"
          value={name}
          className={formInputClassName}
          onChange={onNameChange}
          autoComplete="off"
        />
      </label>
      <div className="flex py-4">
        <FilledButton action={onSaveAction} classes="flex-1 w-full">
          Save
        </FilledButton>
        <Button action={toggle} classes="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

EditTimeName.propTypes = {
  toggle: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  updateTrackTimeName: PropTypes.func.isRequired,
};

export default connect(null, {
  updateTrackTimeName: updateTrackTimeNameAction,
})(EditTimeName);
