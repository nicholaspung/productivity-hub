import {
  updateProfile,
  deleteUser as deleteUserAPI,
  getProfile,
  getUserAnalytics as getUserAnalyticsAPI,
  updateViceThreshold as updateViceThresholdAPI,
  createViceThreshold as createViceThresholdAPI,
} from '../../api/userApi';
import {
  helperLoggedIn,
  helperAttachNewThresholdToUserAnalytics,
} from '../../utils/userUtils';
import { getUserAnalytics as getUserAnalyticsSelector } from '../selectors/userSelectors';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOADING_ERROR = 'USER_LOADING_ERROR';
export const USER_DELETING = 'USER_DELETING';
export const USER_DELETING_DONE = 'USER_DELETING_DONE ';
export const USER_DELETING_ERROR = 'USER_DELETING_ERROR ';
export const APPS_UPDATING = 'APPS_UPDATING';
export const APPS_UPDATING_DONE = 'APPS_UPDATING_DONE';
export const APPS_UPDATING_ERROR = 'APPS_UPDATING_ERROR';
export const USER_ANALYTICS_DONE = 'USER_ANALYTICS_DONE';
export const USER_ANALYTICS_ERROR = 'USER_ANALYTICS_ERROR';
export const CREATE_USER_ANALYTIC_THRESHOLD_DONE =
  'CREATE_USER_ANALYTIC_THRESHOLD_DONE';
export const CREATE_USER_ANALYTIC_THRESHOLD_ERROR =
  'CREATE_USER_ANALYTIC_THRESHOLD_ERROR';
export const UPDATE_USER_ANALYTIC_THRESHOLD_DONE =
  'UPDATE_USER_ANALYTIC_THRESHOLD_DONE';
export const UPDATE_USER_ANALYTIC_THRESHOLD_ERROR =
  'UPDATE_USER_ANALYTIC_THRESHOLD_ERROR';

export const initialLoad = () => (dispatch) => {
  dispatch({ type: USER_LOADING });
};
export const logIn = (callback) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  await callback();
};

export const updateApps = (apps) => ({
  type: APPS_UPDATING_DONE,
  payload: apps,
});
export const loggedIn = () => async (dispatch) => {
  try {
    const { data } = await getProfile();
    const { transformedUser, apps } = helperLoggedIn(data);
    dispatch({
      type: USER_LOGGED_IN,
      payload: transformedUser,
    });
    return dispatch(updateApps(apps));
  } catch (err) {
    return dispatch({ type: USER_LOADING_ERROR, payload: err });
  }
};
export const logOut = () => ({ type: USER_LOGGED_OUT });

export const addApp = (id, newApps) => async (dispatch) => {
  dispatch({ type: APPS_UPDATING });
  try {
    const {
      data: { apps },
    } = await updateProfile(id, { apps: newApps });
    return dispatch(updateApps(apps));
  } catch (err) {
    return dispatch({ type: APPS_UPDATING_ERROR, payload: err });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: USER_DELETING });
  try {
    await deleteUserAPI(id);
    return dispatch({ type: USER_DELETING_DONE });
  } catch (err) {
    return dispatch({ type: USER_DELETING_ERROR, payload: err });
  }
};

export const getUserAnalytics = () => async (dispatch) => {
  try {
    const { data } = await getUserAnalyticsAPI();
    return dispatch({ type: USER_ANALYTICS_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: USER_ANALYTICS_ERROR, payload: err });
  }
};

export const updateViceThreshold = (id, threshold) => async (
  dispatch,
  getState,
) => {
  try {
    const { data } = await updateViceThresholdAPI(id, { threshold });
    const userAnalytics = getUserAnalyticsSelector(getState());
    const updatedUserAnalytics = helperAttachNewThresholdToUserAnalytics(
      data,
      userAnalytics,
    );
    return dispatch({
      type: UPDATE_USER_ANALYTIC_THRESHOLD_DONE,
      payload: updatedUserAnalytics,
    });
  } catch (err) {
    return dispatch({
      type: UPDATE_USER_ANALYTIC_THRESHOLD_ERROR,
      payload: err,
    });
  }
};

export const createViceThreshold = (label, threshold) => async (
  dispatch,
  getState,
) => {
  try {
    const { data } = await createViceThresholdAPI({ label, threshold });
    const userAnalytics = getUserAnalyticsSelector(getState());
    const updatedUserAnalytics = helperAttachNewThresholdToUserAnalytics(
      data,
      userAnalytics,
    );
    return dispatch({
      type: CREATE_USER_ANALYTIC_THRESHOLD_DONE,
      payload: updatedUserAnalytics,
    });
  } catch (err) {
    return dispatch({
      type: CREATE_USER_ANALYTIC_THRESHOLD_ERROR,
      payload: err,
    });
  }
};
