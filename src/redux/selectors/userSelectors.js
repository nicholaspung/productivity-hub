export const getUserState = (store) => store.user;
export const getUserInfo = (store) => getUserState(store).info;
export const getUserApps = (store) => getUserState(store).apps;
export const isLoggedIn = (store) => Boolean(getUserInfo(store).email);
export const isAnonymous = (store) => Boolean(getUserInfo(store).isAnonymous);
export const isUserLoading = (store) => Boolean(getUserState(store).loading);
export const getUserError = (store) => getUserState(store).error;
export const hasError = (store) =>
  Boolean(Object.keys(getUserState(store).error).length);
export const getUserAnalytics = (store) => getUserState(store).userAnalytics;
export const getUserAnalyticLabelFrequencyAndThreshold = (store, label) => {
  const userAnalytics = [...getUserAnalytics(store)].reverse();
  const defaultNumber = 9999;
  const result = {
    frequency: defaultNumber,
    threshold: defaultNumber,
  };
  if (userAnalytics.length) {
    for (let i = 0; i < userAnalytics.length; i += 1) {
      if (label === userAnalytics[i].label) {
        if (userAnalytics[i].threshold) {
          result.threshold = userAnalytics[i].threshold.threshold;
        }
        result.frequency = userAnalytics[i].frequency;
        break;
      }
    }
  }
  return result;
};
