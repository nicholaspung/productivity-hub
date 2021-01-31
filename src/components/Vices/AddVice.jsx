import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FilledButton } from '../BaseComponents';
import { ReactComponent as SaveSVG } from '../../assets/icons/save.svg';
import { addVice as addViceAction } from '../../redux/actions/vicesActions';

const AddVice = ({ addVice }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameError, setNameError] = useState('');
  const [linkError, setLinkError] = useState('');

  const onAddItem = () => {
    if (!name) {
      setNameError('Required');
    }
    if (!link || link.substring(0, 5) !== 'https') {
      setLinkError('Make sure link is "https".');
      return;
    }
    setName('');
    setLink('');
    addVice({ name, link });
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    onAddItem();
  };
  const onNameChange = (event) => setName(event.target.value);
  const onLinkChange = (event) => setLink(event.target.value);

  const nameTitle = 'Name';
  const namePlaceholder = 'Add a new vice';
  const linkTitle = 'Link';
  const linkPlaceholder = 'Add a link to your vice';

  return (
    <form className="p-4 flex h-48" onSubmit={onSubmitForm}>
      <div className="flex flex-col">
        <label htmlFor={nameTitle}>
          <span className="w-full uppercase text-xs">
            {nameTitle}
            {nameError && (
              <span className="text-red-500 pl-1">{nameError}</span>
            )}
          </span>
          <input
            type="text"
            id={nameTitle}
            onChange={onNameChange}
            value={name}
            name="name"
            placeholder={namePlaceholder}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            autoComplete="off"
          />
        </label>
        <label htmlFor={linkTitle}>
          <span className="w-full uppercase text-xs">
            {linkTitle}
            {linkError && (
              <span className="text-red-500 pl-1">{linkError}</span>
            )}
          </span>
          <input
            type="text"
            id={linkTitle}
            onChange={onLinkChange}
            value={link}
            name="link"
            placeholder={linkPlaceholder}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            autoComplete="off"
          />
        </label>
      </div>
      <input type="submit" className="hidden" />
      <FilledButton action={onAddItem} classes="lg:hidden">
        <SaveSVG className="w-4 h-auto" />
      </FilledButton>
      <FilledButton action={onAddItem} classes="hidden lg:inline-flex">
        Save
      </FilledButton>
    </form>
  );
};

AddVice.propTypes = {
  addVice: PropTypes.func.isRequired,
};

export default connect(null, {
  addVice: addViceAction,
})(AddVice);
