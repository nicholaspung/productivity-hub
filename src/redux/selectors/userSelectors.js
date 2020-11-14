export const getUserState = (store) => store.users;
export const getUserInfo = (store) => getUserState(store).info;
export const getUserApps = (store) => getUserState(store).apps;
export const isLoggedIn = (store) => Boolean(getUserInfo(store).uid);
export const isAnonymous = (store) => Boolean(getUserInfo(store).isAnonymous);
export const isUserLoading = (store) => Boolean(getUserState(store).loading);
export const getUserError = (store) => getUserState(store).error;
export const hasError = (store) =>
  Boolean(Object.keys(getUserState(store).error).length);
export const getUserAnalytics = (store) => getUserState(store).userAnalytics;
