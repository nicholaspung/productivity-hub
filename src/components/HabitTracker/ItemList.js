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
      .map((item) => (
        <Component data={item} key={item.id} />
      ))}
  </ul>
);

export default List;
