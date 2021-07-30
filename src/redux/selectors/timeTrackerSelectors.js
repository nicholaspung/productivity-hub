export const getTrackTimesState = (store) => store.trackTimes;
export const getTrackTimes = (store) => getTrackTimesState(store).trackTimes;
export const getTrackTimesLoading = (store) =>
  getTrackTimesState(store).loading;
export const getTrackTimesError = (store) => getTrackTimesState(store).error;
export const getTrackTimeCurrentTrackTime = (store) =>
  getTrackTimesState(store).currentTrackTime || {};
export const hasCurrentTrackTime = (store) =>
  Boolean(getTrackTimeCurrentTrackTime(store).id);

export const getTrackTimeNamesState = (store) => store.trackTimeNames;
export const getTrackTimeNames = (store) =>
  getTrackTimeNamesState(store).trackTimeNames;
export const getTrackTimeNamesLoading = (store) =>
  getTrackTimeNamesState(store).loading;
export const getTrackTimeNamesError = (store) =>
  getTrackTimeNamesState(store).error;
export const getTrackTimeNamesBreakTime = (store) =>
  getTrackTimeNamesState(store).breakTime;

export const getTimeTrackerPreferences = (store) =>
  (store.user.app_preferences && store.user.app_preferences.time_tracker) || {};
export const getTimeTrackerEnablePomodoro = (store) =>
  getTimeTrackerPreferences(store).enable_pomodoro || false;
export const getTimeTrackerPomodoroIntervalTime = (store) =>
  getTimeTrackerPreferences(store).pomodoro_interval_time || '';
export const getTimeTrackerBreakIntervalTime = (store) =>
  getTimeTrackerPreferences(store).break_interval_time || '';
