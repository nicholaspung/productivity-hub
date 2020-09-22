import { updateProfile } from "../api";

export const LOGGED_IN = "LOGGED_IN";
export const LOADING_USER_STATUS = "LOADING_USER_STATUS";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOADING_USER_ERROR = "LOADING_USER_ERROR";
export const ADDING_APP = "ADDING_APP";
export const UPDATE_APPS = "UPDATE_APPS";

export const logIn = (callback) => async (dispatch) => {
  dispatch({ type: LOADING_USER_STATUS });
  await callback();
};
export const loggedIn = (authUser) => ({ type: LOGGED_IN, payload: authUser });
export const logOut = () => ({ type: LOGGED_OUT });

export const addApp = (id, newApps) => async (dispatch) => {
  dispatch({ type: ADDING_APP });
  const { apps } = await updateProfile(id, { apps: newApps });
  return dispatch(updateApps(apps));
};
export const updateApps = (apps) => ({ type: UPDATE_APPS, payload: apps });
