import React from 'react';
import PropTypes from 'prop-types';

const ItemList = ({
  data = [],
  Component,
  filterFunction = (item) => item,
  ...rest
}) => (
  <ul>
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
};

export default ItemList;
