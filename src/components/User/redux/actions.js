import { updateProfile } from "../api";

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOADING = "USER_LOADING";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_LOADING_ERROR = "USER_LOADING_ERROR";
export const APPS_UPDATING = "APPS_UPDATING";
export const APPS_UPDATED = "APPS_UPDATED";

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
  const { apps } = await updateProfile(id, { apps: newApps });
  return dispatch(updateApps(apps));
};
export const updateApps = (apps) => ({ type: APPS_UPDATED, payload: apps });
