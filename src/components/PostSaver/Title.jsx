import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateTitle as updateTitleAction,
  deleteTitle as deleteTitleAction,
} from '../../redux/actions/postSaverActions';
import {
  smallerFilledButtonClassName,
  smallerFormInputClassName,
} from '../BaseComponents';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import { ReactComponent as SaveSVG } from '../../assets/icons/save.svg';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';

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
              type="button"
            >
              <SaveSVG className="w-4 h-auto" title="Save" />
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          onClick={onChangeView}
          className={smallerFilledButtonClassName}
          type="button"
        >
          {edit ? (
            <CancelSVG className="w-4 h-auto" title="Edit title" />
          ) : (
            <EditSVG className="w-4 h-auto" title="Edit title" />
          )}
        </button>
        <button
          onClick={() => deleteTitle(data.id)}
          type="button"
          className="py-1 px-5 flex justify-center"
        >
          <DeleteSVG className="w-4 h-auto" title="Delete title" />
        </button>
      </div>
    </li>
  );
};

Title.propTypes = {
  data: PropTypes.object.isRequired,
  updateTitle: PropTypes.func.isRequired,
  deleteTitle: PropTypes.func.isRequired,
};

export default connect(null, {
  updateTitle: updateTitleAction,
  deleteTitle: deleteTitleAction,
})(Title);
