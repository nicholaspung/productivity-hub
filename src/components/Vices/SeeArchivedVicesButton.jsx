import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { smallerFilledButtonClassName } from '../BaseComponents';
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll';
import Modal from '../BaseComponents/Modal';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import EmptyItem from '../BaseComponents/EmptyItem';

const ArchivedVices = ({ toggle, loading, archivedVices = [], error }) => (
  <div className="w-full text-center p-4">
    <div className="h-0 text-right">
      <button
        type="button"
        className={`${smallerFilledButtonClassName} relative`}
        onClick={toggle}
      >
        X
      </button>
    </div>
    {loading && (
      <div className="h-0">
        <div className="relative top-1 left-6">
          <LoadingSVG className="w-6 h-auto animate-spin absolute" />
        </div>
      </div>
    )}
    <h1 className="text-2xl font-bold">Archived Vices</h1>
    <div className="text-left p-4">
      <EmptyItem
        length={archivedVices.length}
        loading={loading}
        error={error}
        message="You have no habits."
      />
      {archivedVices.length && (
        <div>
          {archivedVices.map((archived) => (
            <div>{archived.name}</div>
          ))}
        </div>
      )}
    </div>
  </div>
);
ArchivedVices.propTypes = {
  toggle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  archivedVices: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
};

// const ConnectedArchivedVices = connect(state => ({
//   archivedVices:
// }))(ArchivedVices)

const SeeArchivedVices = () => {
  const [showArchivedVices, setShowArchivedVices] = useState(false);
  const modalChanges = useDisableBodyScroll();

  return (
    <div className="flex justify-center align-center py-4 border-b-2 border-gray-200">
      <Modal
        isShowing={showArchivedVices}
        toggle={() => {
          modalChanges(false);
          setShowArchivedVices(false);
        }}
        Component={ArchivedVices}
      />
      <button
        type="button"
        onClick={() => setShowArchivedVices(true)}
        className={`${smallerFilledButtonClassName}`}
      >
        See Archived Vices
      </button>
    </div>
  );
};

export default SeeArchivedVices;
