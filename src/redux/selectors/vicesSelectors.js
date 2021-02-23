export const getVicesState = (store) => store.vices;
export const getVicesViceAnalytics = (store) =>
  getVicesState(store).viceAnalytics;
export const getVicesLoading = (store) => getVicesState(store).loading;
export const getVicesError = (store) => getVicesState(store).error;
export const getVicesCache = (store) => getVicesState(store).cache;
