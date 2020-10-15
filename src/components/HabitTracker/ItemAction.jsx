import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  formInputClassName,
  Modal,
  Button,
  FilledButton,
} from '../BaseComponents';

const ItemAction = ({
  data,
  actionFunction,
  displayFunction = () => {},
  labelName = '',
}) => {
  const [name, setName] = useState(data.name || '');
  const [description, setDescription] = useState(data.description || '');

  const onNameChange = (event) => setName(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onSaveAction = () => {
    if (data.id) {
      actionFunction(data.id, { name, description });
    } else {
      actionFunction({ name, description });
    }
    displayFunction();
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    onSaveAction();
  };

  const nameLabelId = data.name
    ? data.name.replace(/ /g, '')
    : `new-${labelName.replace(/ /g, '')}-item`;
  const descriptionLabelId = data.description
    ? data.description.replace(/ /g, '')
    : `new-${labelName.replace(/ /g, '')}-description`;

  return (
    <Modal>
      <div>
        <form onSubmit={onSubmitForm} className="p-4">
          <h1 className="text-2xl px-5 font-bold">{labelName}</h1>
          <label htmlFor={nameLabelId}>
            <span className="w-full uppercase text-xs">Name</span>
            <input
              id={nameLabelId}
              type="text"
              value={name}
              className={formInputClassName}
              onChange={onNameChange}
            />
          </label>
          <label htmlFor={descriptionLabelId}>
            <span className="w-full uppercase text-xs">Description</span>
            <textarea
              id={descriptionLabelId}
              type="text"
              value={description}
              className={`${formInputClassName} h-64 resize-none`}
              onChange={onDescriptionChange}
            />
          </label>
          <div className="flex py-4">
            <FilledButton action={onSaveAction} classes="flex-1 w-full">
              Save
            </FilledButton>
            <Button action={displayFunction} classes="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ItemAction.propTypes = {
  data: PropTypes.object.isRequired,
  actionFunction: PropTypes.func.isRequired,
  displayFunction: PropTypes.func,
  labelName: PropTypes.string,
};

export default ItemAction;
