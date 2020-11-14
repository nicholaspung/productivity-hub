import {
  updateProfile,
  deleteUser as deleteUserAPI,
  getProfile,
  getUserAnalytics as getUserAnalyticsAPI,
} from '../../api/userApi';

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

export const helperLoggedIn = (authUser, data) => {
  const { apps, user } = data;
  const updatedAuthUser = { ...authUser, user };
  return { updatedAuthUser, apps };
};
export const loggedIn = (authUser) => async (dispatch) => {
  try {
    const { data } = await getProfile();
    const { updatedAuthUser, apps } = helperLoggedIn(authUser, data);
    dispatch({
      type: USER_LOGGED_IN,
      payload: updatedAuthUser,
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
