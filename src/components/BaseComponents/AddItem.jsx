import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FilledButton } from '.';

const AddItem = ({
  addItem,
  labelTitle,
  labelButton,
  placeholder,
  property,
}) => {
  const [newItem, setNewItem] = useState('');
  const onAddItem = (event) => {
    event.preventDefault();
    addItem({ [property]: newItem });
    setNewItem('');
  };
  const onTextChange = (event) => setNewItem(event.target.value);

  return (
    <form onSubmit={onAddItem} className="p-4">
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
        <FilledButton action={onAddItem}>{labelButton}</FilledButton>
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
};

AddItem.defaultProps = {
  labelTitle: '',
  labelButton: '',
  placeholder: '',
  property: '',
};

export default AddItem;
