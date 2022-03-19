import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  formInputClassName,
  Button,
  FilledButton,
  smallerButtonClassName,
  smallerFilledButtonClassName,
} from '../../BaseComponents';
import { chosenWeekdays } from '../../../utils/habitTrackerUtils';

const ItemAction = ({
  data,
  actionFunction,
  toggle = () => {},
  labelName = '',
}) => {
  const [name, setName] = useState(data.name || '');
  const [description, setDescription] = useState(data.description || '');
  const [weekdays, setWeekdays] = useState(
    (data.weekdays && data.weekdays.split(',')) || [],
  );

  const onNameChange = (event) => setName(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onSaveAction = () => {
    if (data.id) {
      actionFunction(data.id, {
        name,
        description,
        weekdays: weekdays.join(','),
      });
    } else {
      actionFunction({ name, description, weekdays: weekdays.join(',') });
    }
    toggle();
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    onSaveAction();
  };
  const onWeekdayPress = (weekday) => {
    const weekdaysCopy = chosenWeekdays(weekday, weekdays);
    setWeekdays(weekdaysCopy);
  };

  const nameLabelId = data.name
    ? data.name.replace(/ /g, '')
    : `new-${labelName.replace(/ /g, '')}-item`;
  const descriptionLabelId = data.description
    ? data.description.replace(/ /g, '')
    : `new-${labelName.replace(/ /g, '')}-description`;
  const chooseButtonFill = (weekday) => {
    if (weekdays.includes(weekday)) return smallerFilledButtonClassName;
    return smallerButtonClassName;
  };

  return (
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
          autoComplete="off"
        />
      </label>
      {data.weekdays && (
        <div>
          <span className="w-full uppercase text-xs">
            Days To Create Dailies
          </span>
          <div className="flex justify-around">
            <>
              <button
                type="button"
                onClick={() => onWeekdayPress('Sun')}
                className={`hidden md:block ${chooseButtonFill('Sun')}`}
              >
                Sun
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Mon')}
                className={`hidden md:block ${chooseButtonFill('Mon')}`}
              >
                Mon
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Tue')}
                className={`hidden md:block ${chooseButtonFill('Tue')}`}
              >
                Tue
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Wed')}
                className={`hidden md:block ${chooseButtonFill('Wed')}`}
              >
                Wed
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Thu')}
                className={`hidden md:block ${chooseButtonFill('Thu')}`}
              >
                Thu
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Fri')}
                className={`hidden md:block ${chooseButtonFill('Fri')}`}
              >
                Fri
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Sat')}
                className={`hidden md:block ${chooseButtonFill('Sat')}`}
              >
                Sat
              </button>
            </>
            <>
              <button
                type="button"
                onClick={() => onWeekdayPress('Sun')}
                className={`md:hidden ${chooseButtonFill('Sun').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                S
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Mon')}
                className={`md:hidden ${chooseButtonFill('Mon').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                M
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Tue')}
                className={`md:hidden ${chooseButtonFill('Tue').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                T
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Wed')}
                className={`md:hidden ${chooseButtonFill('Wed').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                W
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Thu')}
                className={`md:hidden ${chooseButtonFill('Thu').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                T
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Fri')}
                className={`md:hidden ${chooseButtonFill('Fri').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                F
              </button>
              <button
                type="button"
                onClick={() => onWeekdayPress('Sat')}
                className={`md:hidden ${chooseButtonFill('Sat').replace(
                  /px-5/,
                  'px-3',
                )}`}
              >
                S
              </button>
            </>
          </div>
        </div>
      )}
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
        <Button action={toggle} classes="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

ItemAction.propTypes = {
  data: PropTypes.object.isRequired,
  actionFunction: PropTypes.func.isRequired,
  toggle: PropTypes.func,
  labelName: PropTypes.string,
};

export default memo(ItemAction);
