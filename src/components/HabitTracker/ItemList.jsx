import React from 'react';
import PropTypes from 'prop-types';

const List = ({ data, Component, filterFunction }) => (
  <ul>
    {data.filter(filterFunction).map((item) => (
      <Component data={item} key={item.id} />
    ))}
  </ul>
);

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  Component: PropTypes.element.isRequired,
  filterFunction: PropTypes.func,
};
List.defaultProps = {
  data: [],
  filterFunction: (item) => item,
};

export default List;
