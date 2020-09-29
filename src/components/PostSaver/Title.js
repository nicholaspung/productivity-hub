import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  updateTitle as updateTitleAction,
  deleteTitle as deleteTitleAction,
} from './redux/actions';
import {
  smallerFilledButtonClassName,
  smallerFormInputClassName,
} from '../BaseComponents';

const Title = ({ data, updateTitle, deleteTitle }) => {
  const [edit, showEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(data.title);
  const onTextChange = (event) => setUpdatedTitle(event.target.value);
  const onChangeView = () => showEdit(!edit);
  const onUpdateTitle = (event) => {
    event.preventDefault();
    updateTitle(data.id, { title: updatedTitle });
    onChangeView();
  };

  return (
    <li
      key={data.id}
      className={`flex justify-between items-center p-2 ${
        edit ? 'bg-gray-400 rounded-md' : ''
      }`}
    >
      <div>
        <span className={edit ? 'text-xs' : ''}>{data.title}</span>
        <div className={edit ? '' : 'hidden'}>
          <form onSubmit={onUpdateTitle} className="flex">
            <input
              type="text"
              value={updatedTitle}
              onChange={onTextChange}
              className={smallerFormInputClassName}
            />
            <button
              onClick={onUpdateTitle}
              className={smallerFilledButtonClassName}
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        <button onClick={onChangeView} className={smallerFilledButtonClassName}>
          {edit ? 'Cancel' : 'Update'}
        </button>
        <button onClick={() => deleteTitle(data.id)}>Delete</button>
      </div>
    </li>
  );
};

export default connect(null, {
  updateTitle: updateTitleAction,
  deleteTitle: deleteTitleAction,
})(Title);
