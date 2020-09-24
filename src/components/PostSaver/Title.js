import React, { useState } from "react";
import { connect } from "react-redux";
import {
  updateTitle as updateTitleAction,
  deleteTitle as deleteTitleAction,
} from "./redux/actions";

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
    <li key={data.id}>
      <span>{data.title}</span>
      {edit && (
        <form onSubmit={onUpdateTitle}>
          <input type="text" value={updatedTitle} onChange={onTextChange} />
          <button onClick={onUpdateTitle}>Save</button>
          <button onClick={onChangeView}>Cancel</button>
        </form>
      )}
      {!edit && <button onClick={onChangeView}>Update</button>}
      <button onClick={() => deleteTitle(data.id)}>Delete</button>
    </li>
  );
};

export default connect(null, {
  updateTitle: updateTitleAction,
  deleteTitle: deleteTitleAction,
})(Title);
