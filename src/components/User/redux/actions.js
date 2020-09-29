import { updateProfile, deleteUser as deleteUserAPI } from '../api';

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

export const logIn = (callback) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  await callback();
};
export const loggedIn = (authUser) => ({
  type: USER_LOGGED_IN,
  payload: authUser,
});
export const logOut = () => ({ type: USER_LOGGED_OUT });

export const addApp = (id, newApps) => async (dispatch) => {
  dispatch({ type: APPS_UPDATING });
  try {
    const { data } = await updateProfile(id, { apps: newApps });
    return dispatch(updateApps(data.apps));
  } catch (err) {
    return dispatch({ type: APPS_UPDATING_ERROR, payload: err });
  }
};
export const updateApps = (apps) => ({
  type: APPS_UPDATING_DONE,
  payload: apps,
});

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: USER_DELETING });
  try {
    await deleteUserAPI(id);
    return dispatch({ type: USER_DELETING_DONE });
  } catch (err) {
    return dispatch({ type: USER_DELETING_ERROR, payload: err });
  }
};
