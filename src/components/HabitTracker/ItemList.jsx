import React from 'react';
import PropTypes from 'prop-types';
import EmptyItem from '../BaseComponents/EmptyItem';

const ItemList = ({
  data = [],
  Component,
  filterFunction = (item) => item,
  loading = false,
  ...rest
}) => (
  <ul>
    <EmptyItem length={data.length} loading={loading} />
    {data.length
      ? data
          .filter(filterFunction)
          .map((item) => <Component data={item} key={item.id} {...rest} />)
      : null}
  </ul>
);

ItemList.propTypes = {
  data: PropTypes.array,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  filterFunction: PropTypes.func,
  loading: PropTypes.bool,
};

export default ItemList;
