import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FilledButton } from '.';
import { ReactComponent as SaveSVG } from '../../assets/icons/save.svg';

const AddItem = ({
  addItem,
  labelTitle = '',
  labelButton = '',
  placeholder = '',
  property = '',
  classes = '',
  MobileIconOverride,
  setOutsideState = () => {},
  callback = () => {},
}) => {
  const [newItem, setNewItem] = useState('');

  const onAddItem = (event) => {
    event.preventDefault();
    addItem({ [property]: newItem });
    setNewItem('');
    setOutsideState('');
    callback();
  };
  const onTextChange = (event) => {
    setNewItem(event.target.value);
    setOutsideState(event.target.value);
  };

  return (
    <form onSubmit={onAddItem} className={`p-4 ${classes}`} autoComplete="off">
      <span className="w-full uppercase text-xs">{labelTitle}</span>
      <label htmlFor={labelTitle} className="flex">
        <input
          type="text"
          id={labelTitle}
          onChange={onTextChange}
          value={newItem}
          placeholder={placeholder}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <FilledButton action={onAddItem} classes="lg:hidden">
          {MobileIconOverride ? (
            <MobileIconOverride className="w-4 h-auto" />
          ) : (
            <SaveSVG className="w-4 h-auto" />
          )}
        </FilledButton>
        <FilledButton action={onAddItem} classes="hidden lg:inline-flex">
          {labelButton}
        </FilledButton>
      </label>
    </form>
  );
};

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  labelTitle: PropTypes.string,
  labelButton: PropTypes.string,
  placeholder: PropTypes.string,
  property: PropTypes.string,
  classes: PropTypes.string,
  MobileIconOverride: PropTypes.object,
  setOutsideState: PropTypes.func,
  callback: PropTypes.func,
};

export default AddItem;
