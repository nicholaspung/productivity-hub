import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddItemButtons from './AddItemButtons';

const AddItem = ({
  addItem,
  addItem2 = () => {},
  labelTitle = '',
  labelButton = '',
  labelButton2 = '',
  placeholder = '',
  property = '',
  classes = '',
  MobileIconOverride,
  MobileIconOverride2,
  secondButton = false,
  disable = false,
  setOutsideState = () => {},
  callback = () => {},
  callback2 = () => {},
}) => {
  const [newItem, setNewItem] = useState('');

  const onAddItem = (event) => {
    event.preventDefault();
    addItem({ [property]: newItem });
    setNewItem('');
    setOutsideState('');
    callback();
  };
  const onAddItem2 = (event) => {
    event.preventDefault();
    addItem2({ [property]: newItem });
    setNewItem('');
    setOutsideState('');
    callback2();
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
          className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
            disable ? 'pointer-events-none' : ''
          }`}
          disabled={disable}
        />
        {secondButton && (
          <AddItemButtons
            onAddItemAction={onAddItem2}
            MobileIconOverrideImage={MobileIconOverride2}
            disableMe={disable}
            labelButtonText={labelButton2}
          />
        )}
        <AddItemButtons
          onAddItemAction={onAddItem}
          MobileIconOverrideImage={MobileIconOverride}
          disableMe={disable}
          labelButtonText={labelButton}
        />
      </label>
    </form>
  );
};

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  addItem2: PropTypes.func,
  labelTitle: PropTypes.string,
  labelButton: PropTypes.string,
  labelButton2: PropTypes.string,
  placeholder: PropTypes.string,
  property: PropTypes.string,
  classes: PropTypes.string,
  secondButton: PropTypes.bool,
  disable: PropTypes.bool,
  MobileIconOverride: PropTypes.object,
  MobileIconOverride2: PropTypes.object,
  setOutsideState: PropTypes.func,
  callback: PropTypes.func,
  callback2: PropTypes.func,
};

export default AddItem;
