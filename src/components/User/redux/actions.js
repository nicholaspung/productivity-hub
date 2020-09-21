export const LOGGED_IN = "LOGGED_IN";
export const LOADING_USER_STATUS = "LOADING_USER_STATUS";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOADING_USER_ERROR = "LOADING_USER_ERROR";
export const UPDATE_APPS = "UPDATE_APPS";

export const logIn = (callback) => async (dispatch) => {
  dispatch({ type: LOADING_USER_STATUS });
  await callback();
};

export const loggedIn = (authUser) => ({ type: LOGGED_IN, payload: authUser });
export const logOut = () => ({ type: LOGGED_OUT });
export const updateApps = (apps) => ({ type: UPDATE_APPS, payload: apps });
