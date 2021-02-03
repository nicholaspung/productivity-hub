import React from 'react';
import PropTypes from 'prop-types';
import { FilledButton } from '../../BaseComponents';
import DailyItem from '../DailyItem';
import ItemList from '../SharedComponents/ItemList';

const PreviousDailies = ({ date, data, toggle }) => (
  <div className="w-full text-center p-4">
    <h1 className="text-2xl font-bold">{date.toDateString()}</h1>
    <p>Previous dailies to see your past progress.</p>
    <div className="text-left p-4">
      <ItemList data={data} Component={DailyItem} hideOptions disableInput />
    </div>
    <FilledButton action={toggle}>Close</FilledButton>
  </div>
);
PreviousDailies.propTypes = {
  data: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default PreviousDailies;
