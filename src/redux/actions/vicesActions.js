import {
  createViceAnalytics as createViceAnalyticsAPI,
  addVice as addViceAPI,
  updateVice as updateViceAPI,
  deleteVice as deleteViceAPI,
  addFrequencyForViceAnalytic as addFrequencyForViceAnalyticAPI,
} from '../../api/vicesApi';
import { getVicesViceAnalytics } from '../selectors/vicesSelectors';

export const VICE_ANALYTICS_FETCHING = 'VICE_ANALYTICS_FETCHING';
export const VICE_ANALYTICS_FETCHING_DONE = 'VICE_ANALYTICS_FETCHING_DONE';
export const VICE_ANALYTICS_FETCHING_ERROR = 'VICE_ANALYTICS_FETCHING_ERROR';

export const VICE_ANALYTICS_INCREASE = 'VICE_ANALYTICS_INCREASE';
export const VICE_ANALYTICS_INCREASE_DONE = 'VICE_ANALYTICS_INCREASE_DONE';
export const VICE_ANALYTICS_INCREASE_ERROR = 'VICE_ANALYTICS_INCREASE_ERROR';

export const VICES_ADDING = 'VICES_ADDING';
export const VICES_ADDING_DONE = 'VICES_ADDING_DONE';
export const VICES_ADDING_ERROR = 'VICES_ADDING_ERROR';

export const VICES_EDITING = 'VICES_EDITING';
export const VICES_EDITING_DONE = 'VICES_EDITING_DONE';
export const VICES_EDITING_ERROR = 'VICES_EDITING_ERROR';

export const VICES_DELETING = 'VICES_DELETING';
export const VICES_DELETING_DONE = 'VICES_DELETING_DONE';
export const VICES_DELETING_ERROR = 'VICES_DELETING_ERROR';

export const VICE_THRESHOLD_CREATING = 'VICE_THRESHOLD_CREATING';
export const VICE_THRESHOLD_CREATING_DONE = 'VICE_THRESHOLD_CREATING_DONE';
export const VICE_THRESHOLD_CREATING_ERROR = 'VICE_THRESHOLD_CREATING_ERROR';

export const VICE_THRESHOLD_UPDATING = 'VICE_THRESHOLD_UPDATING';
export const VICE_THRESHOLD_UPDATING_DONE = 'VICE_THRESHOLD_UPDATING_DONE';
export const VICE_THRESHOLD_UPDATING_ERROR = 'VICE_THRESHOLD_UPDATING_ERROR';

export const createViceAnalytics = () => async (dispatch) => {
  dispatch({ type: VICE_ANALYTICS_FETCHING });
  try {
    const { data } = await createViceAnalyticsAPI();
    return dispatch({ type: VICE_ANALYTICS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: VICE_ANALYTICS_FETCHING_ERROR, payload: err });
  }
};
export const addFrequencyForViceAnalytic = (id) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: VICE_ANALYTICS_INCREASE });
  try {
    const { data } = await addFrequencyForViceAnalyticAPI(id);
    const viceAnalytics = getVicesViceAnalytics(getState());
    const viceAnalyticsCopy = [...viceAnalytics];
    const viceAnalyticIdx = viceAnalyticsCopy.findIndex(
      (el) => el.id === data.id,
    );
    viceAnalyticsCopy[viceAnalyticIdx] = data;
    return dispatch({
      type: VICE_ANALYTICS_INCREASE_DONE,
      payload: viceAnalyticsCopy,
    });
  } catch (err) {
    return dispatch({ type: VICE_ANALYTICS_INCREASE_ERROR, payload: err });
  }
};
export const addVice = (vice) => async (dispatch) => {
  dispatch({ type: VICES_ADDING });
  try {
    await addViceAPI(vice);
    const { data } = await createViceAnalyticsAPI();
    return dispatch({ type: VICES_ADDING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: VICES_ADDING_ERROR, payload: err });
  }
};
export const editVice = (id, newVice) => async (dispatch, getState) => {
  dispatch({ type: VICES_EDITING });
  try {
    const { data } = await updateViceAPI(id, newVice);
    const viceAnalytics = getVicesViceAnalytics(getState());
    const viceAnalyticsCopy = [...viceAnalytics];
    const viceAnalyticIdx = viceAnalyticsCopy.findIndex(
      (el) => el.vice.id === data.id,
    );
    viceAnalyticsCopy[viceAnalyticIdx].vice = data;
    return dispatch({ type: VICES_EDITING_DONE, payload: viceAnalyticsCopy });
  } catch (err) {
    return dispatch({ type: VICES_EDITING_ERROR, payload: err });
  }
};
export const deleteVice = (id) => async (dispatch, getState) => {
  dispatch({ type: VICES_DELETING });
  try {
    await deleteViceAPI(id);
    const {
      vices: { viceAnalytics },
    } = getState();
    const viceAnalyticsCopy = [...viceAnalytics];
    const viceIdx = viceAnalyticsCopy.findIndex((el) => el.vice.id === id);
    viceAnalyticsCopy.splice(viceIdx, 1);
    return dispatch({ type: VICES_DELETING_DONE, payload: viceAnalyticsCopy });
  } catch (err) {
    return dispatch({ type: VICES_DELETING_ERROR, payload: err });
  }
};
