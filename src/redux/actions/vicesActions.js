import {
  createViceAnalytics as createViceAnalyticsAPI,
  addVice as addViceAPI,
  updateVice as updateViceAPI,
  deleteVice as deleteViceAPI,
  incrementFrequencyForViceAnalytic as incrementFrequencyForViceAnalyticAPI,
} from '../../api/vicesApi';
import { getVicesViceAnalytics } from '../selectors/vicesSelectors';
import {
  filterArchivedVicesOut,
  filterUnarchivedVicesOut,
} from '../../utils/viceUtils';

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
export const VICES_CLEAR = 'VICES_CLEAR';
export const ADD_ARCHIVED_VICES = 'ADD_ARCHIVED_VICES';

export const createViceAnalytics = () => async (dispatch) => {
  dispatch({ type: VICE_ANALYTICS_FETCHING });
  try {
    const { data } = await createViceAnalyticsAPI();
    dispatch({
      type: ADD_ARCHIVED_VICES,
      payload: filterUnarchivedVicesOut(data),
    });
    return dispatch({
      type: VICE_ANALYTICS_FETCHING_DONE,
      payload: filterArchivedVicesOut(data),
    });
  } catch (err) {
    return dispatch({ type: VICE_ANALYTICS_FETCHING_ERROR, payload: err });
  }
};
export const incrementFrequencyForViceAnalytic = (
  id,
  currentFrequency,
) => async (dispatch, getState) => {
  dispatch({ type: VICE_ANALYTICS_INCREASE });
  try {
    const { data } = await incrementFrequencyForViceAnalyticAPI(id, {
      frequency: currentFrequency + 1,
    });
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
    dispatch({
      type: ADD_ARCHIVED_VICES,
      payload: filterUnarchivedVicesOut(viceAnalyticsCopy),
    });
    return dispatch({
      type: VICES_EDITING_DONE,
      payload: filterArchivedVicesOut(viceAnalyticsCopy),
    });
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
export const clearVices = () => ({ type: VICES_CLEAR });
