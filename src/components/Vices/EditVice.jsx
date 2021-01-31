import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editVice as editViceAction } from '../../redux/actions/vicesActions';
import { formInputClassName, FilledButton, Button } from '../BaseComponents';
import { transformTimeBetween } from '../../utils/viceUtils';

const EditVice = ({ toggle, data, editVice }) => {
  const [name, setName] = useState(data.vice.name);
  const [link, setLink] = useState(data.vice.link);
  const [timeBetween, setTimeBetween] = useState(
    parseInt(data.vice.time_between.slice(0, 2), 10),
  );
  const [nameError, setNameError] = useState('');
  const [linkError, setLinkError] = useState('');

  const onNameChange = (event) => setName(event.target.value);
  const onLinkChange = (event) => setLink(event.target.value);
  const onTimeBetweenChange = (event) => setTimeBetween(event.target.value);
  const onSaveAction = async (e) => {
    e.preventDefault();
    if (!name) {
      setNameError('Required');
    }
    if (!link || link.substring(0, 5) !== 'https') {
      setLinkError('Make sure link is "https".');
      return;
    }
    await editVice(data.vice.id, {
      name,
      link,
      time_between: transformTimeBetween(timeBetween),
    });
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
      <label htmlFor="vice-time-between">
        <span className="w-full uppercase text-xs">Time Between</span>
        <div className="relative">
          <select
            onChange={onTimeBetweenChange}
            id="vice-time-between"
            defaultValue={timeBetween}
            className={formInputClassName}
          >
            {Array(24)
              .fill(0)
              .map((_, idx) => (
                <option value={idx + 1} key={`${_}${idx}`}>
                  {idx + 1} hours
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
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
