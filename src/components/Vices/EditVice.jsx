import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editVice as editViceAction } from '../../redux/actions/vicesActions';
import { formInputClassName, FilledButton, Button } from '../BaseComponents';

const EditVice = ({ toggle, data, editVice }) => {
  const [name, setName] = useState(data.vice.name);
  const [link, setLink] = useState(data.vice.link);
  const [nameError, setNameError] = useState('');
  const [linkError, setLinkError] = useState('');

  const onNameChange = (event) => setName(event.target.value);
  const onLinkChange = (event) => setLink(event.target.value);
  const onSaveAction = async (e) => {
    e.preventDefault();
    if (!name) {
      setNameError('Required');
    }
    if (!link || link.substring(0, 5) !== 'https') {
      setLinkError('Make sure link is "https".');
      return;
    }
    await editVice(data.vice.id, { name, link });
    toggle();
  };

  return (
    <form className="p-4">
      <h1 className="text-2xl px-5 font-bold">Edit Vice</h1>
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
      <label htmlFor="vice-link">
        <span className="w-full uppercase text-xs">
          Link
          {linkError && <span className="text-red-500 pl-1">{linkError}</span>}
        </span>
        <input
          id="vice-link"
          type="text"
          value={link}
          className={formInputClassName}
          onChange={onLinkChange}
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

EditVice.propTypes = {
  toggle: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  editVice: PropTypes.func.isRequired,
};

export default connect(null, {
  editVice: editViceAction,
})(EditVice);
