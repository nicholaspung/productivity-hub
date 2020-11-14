import { userAnalyticsUrl } from '../../api/baseApi';

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
export const getUserAnalyticsThreshold = (store, label) => {
  const userAnalytics = getUserAnalytics(store);
  for (let i = 0; i < userAnalytics.length; i += 1) {
    if (label === userAnalytics[i].label) {
      return userAnalytics[i].threshold;
    }
  }
};
