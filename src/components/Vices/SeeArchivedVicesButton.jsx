import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { smallerFilledButtonClassName } from '../BaseComponents';
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll';
import Modal from '../BaseComponents/Modal';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import EmptyItem from '../BaseComponents/EmptyItem';
import {
  getVicesArchivedVices,
  getVicesError,
  getVicesLoading,
} from '../../redux/selectors/vicesSelectors';
import {
  editVice as editViceAction,
  deleteVice as deleteViceAction,
  // getArchivedVices as getArchivedVicesAction,
} from '../../redux/actions/vicesActions';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';
import { ReactComponent as UnarchiveSVG } from '../../assets/icons/unarchive.svg';

const ArchivedVicesList = ({
  toggle,
  loading,
  archivedVices,
  error,
  getArchivedVices,
  editVice,
  deleteVice,
}) => {
  useEffect(() => {
    getArchivedVices();
  }, []);

  const onUnarchiveAction = (id) => editVice(id, { archived: false });
  const onDeleteAction = (id) => deleteVice(id);

  return (
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
          message="You have no archived vices."
        />
        <div className="flex flex-wrap flex-col justify-around rounded-md border-2 border-gray-200">
          <div className="flex justify-between">
            <p className="flex-1 text-center underline">Name</p>
            <button type="button" className="flex-1" onClick={getArchivedVices}>
              <div className="flex justify-center">
                <RefreshSVG className="w-4 h-auto py-1" />
              </div>
            </button>
          </div>
          {archivedVices.length && (
            <>
              {archivedVices.map((vice) => (
                <div className="flex justify-between even:bg-gray-500 py-2 items-center">
                  <p className="flex-1 text-center">{vice.name}</p>
                  <div className="flex-1 text-center flex justify-around">
                    <button
                      onClick={() => onUnarchiveAction(vice.id)}
                      type="button"
                    >
                      <UnarchiveSVG
                        className="w-4 h-auto"
                        title="Unarchive vice"
                      />
                    </button>
                    <button
                      onClick={() => onDeleteAction(vice.id)}
                      type="button"
                    >
                      <DeleteSVG className="w-4 h-auto" title="Delete vice" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
ArchivedVicesList.propTypes = {
  toggle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  archivedVices: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  getArchivedVices: PropTypes.func.isRequired,
  editVice: PropTypes.func.isRequired,
  deleteVice: PropTypes.func.isRequired,
};

const ConnectedArchivedVices = connect(
  (state) => ({
    archivedVices: getVicesArchivedVices(state),
    loading: getVicesLoading(state),
    error: getVicesError(state),
  }),
  {
    // getArchivedVices: getArchivedVicesAction,
    editVice: editViceAction,
    deleteVice: deleteViceAction,
  },
)(ArchivedVicesList);

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
        Component={ConnectedArchivedVices}
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
