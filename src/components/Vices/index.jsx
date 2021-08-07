import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from '../BaseComponents/Helmet';
import ViceList from './ViceList';
import AddVice from './AddVice';
import { getVicesLoading } from '../../redux/selectors/vicesSelectors';
import AppTitleWithLoading from '../BaseComponents/AppTitleWithLoading';
import SeeArchivedVicesButton from './SeeArchivedVicesButton';
// import AddVirtue from './AddVirtue';

const Vices = ({ loading }) => (
  <>
    <Helmet
      title="Vices | myexperiment.life"
      name="Vices Page"
      content="This is where you see your saved vices."
    />
    <AppTitleWithLoading loading={loading} title="Vices" />
    <div className="flex flex-wrap justify-around mb-4 mx-4 rounded-md border-2 border-gray-200">
      <ViceList />
      <div>
        <AddVice />
        <SeeArchivedVicesButton />
        {/* <AddVirtue /> */}
      </div>
    </div>
  </>
);
Vices.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect((state) => ({ loading: getVicesLoading(state) }))(Vices);
