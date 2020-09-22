import React, { useState } from "react";

const ItemAction = ({
  data = {},
  actionFunction = () => {},
  labelName = "",
}) => {
  const [name, setName] = useState(data.name || "");
  const [description, setDescription] = useState(data.description || "");

  const onNameChange = (event) => setName(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (data.id) {
      actionFunction(data.id, { name, description });
    } else {
      actionFunction({ name, description });
    }
    setName("");
    setDescription("");
  };

  const nameLabelId = data.name
    ? data.name.replace(/ /g, "")
    : `new-${labelName.replace(/ /g, "")}-item`;
  const descriptionLabelId = data.description
    ? data.description.replace(/ /g, "")
    : `new-${labelName.replace(/ /g, "")}-description`;

  return (
    <form onSubmit={onSubmitForm}>
      <h1>{labelName}</h1>
      <label htmlFor={nameLabelId}>Name</label>
      <input
        id={nameLabelId}
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <label htmlFor={descriptionLabelId}>Description</label>
      <textarea
        id={descriptionLabelId}
        type="text"
        value={description}
        onChange={onDescriptionChange}
      />
    </form>
  );
};

export default ItemAction;
