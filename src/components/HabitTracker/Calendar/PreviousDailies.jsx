import React from 'react';
import PropTypes from 'prop-types';
import { Modal, FilledButton } from '../../BaseComponents';
import DailyItem from '../DailyItem';
import ItemList from '../ItemList';

const PreviousDailies = ({ date, data, displayFunction }) => (
  <Modal>
    <div className="w-full text-center p-4">
      <h1 className="text-2xl font-bold">{date.toDateString()}</h1>
      <p>Previous dailies to see your past progress.</p>
      <div className="text-left p-4">
        <ItemList data={data} Component={DailyItem} hideOptions disableInput />
      </div>
      <FilledButton action={displayFunction}>Close</FilledButton>
    </div>
  </Modal>
);
PreviousDailies.propTypes = {
  data: PropTypes.array.isRequired,
  displayFunction: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default PreviousDailies;
