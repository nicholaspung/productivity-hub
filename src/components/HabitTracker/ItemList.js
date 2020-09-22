import React from "react";

const List = ({ data = [], sortField, Component }) => (
  <ul>
    {data
      .filter((item) => {
        if (sortField) {
          return !item[sortField].archived;
        }
        return !item.finished;
      })
      .sort((a, b) => {
        let aField = a;
        let bField = b;
        if (sortField) {
          aField = aField[sortField];
          bField = bField[sortField];
        }
        if (aField.order > bField.order) {
          return 1;
        } else if (aField.order < bField.order) {
          return -1;
        } else {
          return 0;
        }
      })
      .map((item) => (
        <Component data={item} key={item.id} />
      ))}
  </ul>
);

export default List;
