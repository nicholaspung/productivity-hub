import React, { useState } from "react";
import { connect } from "react-redux";
import { addTitle as addTitleAction } from "./redux/actions";

const AddTitle = ({ addTitle }) => {
  const [newTitle, setNewTitle] = useState("");
  const onAddTitle = (event) => {
    event.preventDefault();
    addTitle({ title: newTitle });
    setNewTitle("");
  };
  const onTextChange = (event) => setNewTitle(event.target.value);

  return (
    <form onSubmit={onAddTitle}>
      <input type="text" onChange={onTextChange} value={newTitle} />
      <button onClick={onAddTitle}>Add New Title</button>
    </form>
  );
};

export default connect(null, { addTitle: addTitleAction })(AddTitle);
