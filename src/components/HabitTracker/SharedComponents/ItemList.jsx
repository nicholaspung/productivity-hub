import React from 'react';
import PropTypes from 'prop-types';

const ItemList = ({
  data = [],
  Component,
  filterFunction = (item) => item,
  ...rest
}) => {
  const filteredData = data.filter(filterFunction);
  return (
    <ul>
      {data.length
        ? filteredData.map((item, index) => (
            <Component
              data={item}
              key={item.id}
              {...rest}
              firstItem={index === 0}
              lastItem={index === filteredData.length - 1}
            />
          ))
        : null}
    </ul>
  );
};

ItemList.propTypes = {
  data: PropTypes.array,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  filterFunction: PropTypes.func,
};

export default ItemList;
