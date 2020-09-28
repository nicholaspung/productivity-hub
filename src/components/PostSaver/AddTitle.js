import React, { useState } from "react";
import { connect } from "react-redux";
import { addTitle as addTitleAction } from "./redux/actions";
import { FilledButton } from "../BaseComponents";

const AddTitle = ({ addTitle }) => {
  const [newTitle, setNewTitle] = useState("");
  const onAddTitle = (event) => {
    event.preventDefault();
    addTitle({ title: newTitle });
    setNewTitle("");
  };
  const onTextChange = (event) => setNewTitle(event.target.value);

  return (
    <form onSubmit={onAddTitle} className="p-4">
      <span className="w-full uppercase text-xs">Add a title</span>
      <label htmlFor="add-post" className="flex">
        <input
          type="text"
          id="add-post"
          onChange={onTextChange}
          value={newTitle}
          placeholder="Add..."
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <FilledButton action={onAddTitle}>Add New Title</FilledButton>
      </label>
    </form>
  );
};

export default connect(null, { addTitle: addTitleAction })(AddTitle);
