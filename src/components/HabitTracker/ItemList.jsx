import React from 'react';
import PropTypes from 'prop-types';
import EmptyItem from '../BaseComponents/EmptyItem';

const ItemList = ({ data, Component, filterFunction, loading }) => (
  <ul>
    <EmptyItem length={data.length} loading={loading} />
    {data.filter(filterFunction).map((item) => (
      <Component data={item} key={item.id} />
    ))}
  </ul>
);

ItemList.propTypes = {
  data: PropTypes.array,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  filterFunction: PropTypes.func,
  loading: PropTypes.bool,
};
ItemList.defaultProps = {
  data: [],
  filterFunction: (item) => item,
  loading: false,
};

export default ItemList;
