import React from 'react';
import AddItem from '../BaseComponents/AddItem';

const AddVirtue = () => {
  const addVirtue = () => {};

  return (
    <div>
      <h2 className="font-bold pt-2 pl-4 border-b-2 border-gray-200">
        Add a Virtue
      </h2>
      <AddItem
        addItem={addVirtue}
        labelTitle="Name"
        labelButton="Save"
        placeholder="Add a new virtue"
        property="name"
        classes="mt-2"
      />
    </div>
  );
};

export default AddVirtue;
