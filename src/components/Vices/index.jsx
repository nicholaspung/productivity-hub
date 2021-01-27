import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from '../BaseComponents/Helmet';
import ViceList from './ViceList';
import AddVice from './AddVice';
import { getVicesLoading } from '../../redux/selectors/vicesSelectors';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';

const Vices = ({ loading }) => (
  <>
    <Helmet
      title="Vices | myexperiment.life"
      name="Vices Page"
      content="This is where you see your saved vices."
    />
    <div className="flex justify-center">
      {loading && (
        <div className="h-0">
          <div className="relative top-7 right-12">
            <LoadingSVG className="w-6 h-auto animate-spin absolute" />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-center p-4">Vices</h1>
    </div>
    <div className="flex flex-wrap justify-around mb-4 mx-4 rounded-md border-2 border-gray-200">
      <ViceList />
      <AddVice />
    </div>
  </>
);
Vices.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect((state) => ({ loading: getVicesLoading(state) }))(Vices);
