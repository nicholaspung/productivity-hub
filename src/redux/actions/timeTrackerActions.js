import {
  helperReplaceObjectInArray,
  helperRemoveObjectFromArray,
} from '../../utils/baseUtils';
import {
  getTrackTimes as getTrackTimesAPI,
  createTrackTime as createTrackTimeAPI,
  updateTrackTime as updateTrackTimeAPI,
  deleteTrackTime as deleteTrackTimeAPI,
  getTrackTimeNames as getTrackTimeNamesAPI,
  createTrackTimeName as createTrackTimeNameAPI,
  updateTrackTimeName as updateTrackTimeNameAPI,
  deleteTrackTimeName as deleteTrackTimeNameAPI,
  updateTrackTimePreferences as updateTrackTimePreferencesAPI,
} from '../../api/timeTrackerApi';
import { getDateTransform } from '../../utils/dateUtils';

export const TRACK_TIMES_START_TIMER = 'TRACK_TIMES_START_TIMER';
export const TRACK_TIMES_START_TIMER_DONE = 'TRACK_TIMES_START_TIMER_DONE';
export const TRACK_TIMES_START_TIMER_ERROR = 'TRACK_TIMES_START_TIMER_ERROR';
export const TRACK_TIMES_END_TIMER = 'TRACK_TIMES_END_TIMER';
export const TRACK_TIMES_END_TIMER_DONE = 'TRACK_TIMES_END_TIMER_DONE';
export const TRACK_TIMES_END_TIMER_ERROR = 'TRACK_TIMES_END_TIMER_ERROR';
export const TRACK_TIMES_SET_CURRENT_TRACK_TIME =
  'TRACK_TIMES_SET_CURRENT_TRACK_TIME';
export const TRACK_TIMES_FETCHING = 'TRACK_TIMES_FETCHING';
export const TRACK_TIMES_FETCHING_DONE = 'TRACK_TIMES_FETCHING_DONE';
export const TRACK_TIMES_FETCHING_ERROR = 'TRACK_TIMES_FETCHING_ERROR';
export const TRACK_TIMES_ADDING = 'TRACK_TIMES_ADDING';
export const TRACK_TIMES_ADDING_DONE = 'TRACK_TIMES_ADDING_DONE';
export const TRACK_TIMES_ADDING_ERROR = 'TRACK_TIMES_ADDING_ERROR';
export const TRACK_TIMES_UPDATING = 'TRACK_TIMES_UPDATING';
export const TRACK_TIMES_UPDATING_DONE = 'TRACK_TIMES_UPDATING_DONE';
export const TRACK_TIMES_UPDATING_ERROR = 'TRACK_TIMES_UPDATING_ERROR';
export const TRACK_TIMES_DELETING = 'TRACK_TIMES_DELETING';
export const TRACK_TIMES_DELETING_DONE = 'TRACK_TIMES_DELETING_DONE';
export const TRACK_TIMES_DELETING_ERROR = 'TRACK_TIMES_DELETING_ERROR';
export const TRACK_TIME_NAMES_FETCHING = 'TRACK_TIME_NAMES_FETCHING';
export const TRACK_TIME_NAMES_FETCHING_DONE = 'TRACK_TIME_NAMES_FETCHING_DONE';
export const TRACK_TIME_NAMES_FETCHING_ERROR =
  'TRACK_TIME_NAMES_FETCHING_ERROR';
export const TRACK_TIME_NAMES_ADDING = 'TRACK_TIME_NAMES_ADDING';
export const TRACK_TIME_NAMES_ADDING_DONE = 'TRACK_TIME_NAMES_ADDING_DONE';
export const TRACK_TIME_NAMES_ADDING_ERROR = 'TRACK_TIME_NAMES_ADDING_ERROR';
export const TRACK_TIME_NAMES_UPDATING = 'TRACK_TIME_NAMES_UPDATING';
export const TRACK_TIME_NAMES_UPDATING_DONE = 'TRACK_TIME_NAMES_UPDATING_DONE';
export const TRACK_TIME_NAMES_UPDATING_ERROR =
  'TRACK_TIME_NAMES_UPDATING_ERROR';
export const TRACK_TIME_NAMES_DELETING = 'TRACK_TIME_NAMES_DELETING';
export const TRACK_TIME_NAMES_DELETING_DONE = 'TRACK_TIME_NAMES_DELETING_DONE';
export const TRACK_TIME_NAMES_DELETING_ERROR =
  'TRACK_TIME_NAMES_DELETING_ERROR';
export const TRACK_TIME_PREFERENCES_UPDATING =
  'TRACK_TIME_PREFERENCES_UPDATING';
export const TRACK_TIME_PREFERENCES_UPDATING_DONE =
  'TRACK_TIME_PREFERENCES_UPDATING_DONE';
export const TRACK_TIME_PREFERENCES_UPDATING_ERROR =
  'TRACK_TIME_PREFERENCES_UPDATING_ERROR';
export const TIME_TRACKER_CLEAR = 'TIME_TRACKER_CLEAR';
export const TRACK_TIME_NAME_SET_BREAK_TIME = 'TRACK_TIME_NAME_SET_BREAK_TIME';

export const createTrackTimeNameAndStartTrackTimeTimer = (name) => async (
  dispatch,
  getState,
) => {
  let newTrackName;
  dispatch({ type: TRACK_TIME_NAMES_ADDING });
  try {
    const { data } = await createTrackTimeNameAPI(name);
    newTrackName = data;
    const {
      trackTimeNames: { trackTimeNames },
    } = getState();
    dispatch({
      type: TRACK_TIME_NAMES_ADDING_DONE,
      payload: [...trackTimeNames, data],
    });

    dispatch({ type: TRACK_TIMES_START_TIMER });
    try {
      const today = new Date();
      const { data: data2 } = await createTrackTimeAPI({
        track_time_name: newTrackName.id,
        start_time: today,
        date: getDateTransform(today),
      });
      return dispatch({ type: TRACK_TIMES_START_TIMER_DONE, payload: data2 });
    } catch (err) {
      return dispatch({ type: TRACK_TIMES_START_TIMER_ERROR, payload: err });
    }
  } catch (err) {
    return dispatch({ type: TRACK_TIME_NAMES_ADDING_ERROR, payload: err });
  }
};
export const startTrackTimeTimer = (trackTime) => async (dispatch) => {
  dispatch({ type: TRACK_TIMES_START_TIMER });
  try {
    const { data } = await createTrackTimeAPI(trackTime);
    return dispatch({ type: TRACK_TIMES_START_TIMER_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: TRACK_TIMES_START_TIMER_ERROR, payload: err });
  }
};
export const endTrackTimeTimer = (id, endTime) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: TRACK_TIMES_END_TIMER });
  try {
    const { data } = await updateTrackTimeAPI(id, endTime);
    const {
      trackTimes: { trackTimes },
    } = getState();
    const trackTimesCopy = [...trackTimes, data];
    return dispatch({
      type: TRACK_TIMES_END_TIMER_DONE,
      payload: trackTimesCopy,
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIMES_END_TIMER_ERROR, payload: err });
  }
};
export const getTrackTimes = () => async (dispatch, getState) => {
  dispatch({ type: TRACK_TIMES_FETCHING });
  try {
    const { data } = await getTrackTimesAPI();
    const dataCopy = [...data];
    const {
      trackTimes: { currentTrackTime },
    } = getState();
    if (!currentTrackTime.id) {
      for (let i = 0; i < dataCopy.length; i += 1) {
        const trackTime = dataCopy[i];
        if (!trackTime.end_time) {
          dispatch({
            type: TRACK_TIMES_SET_CURRENT_TRACK_TIME,
            payload: trackTime,
          });
          break;
        }
      }
    }
    const {
      trackTimes: { currentTrackTime: updatedCurrentTrackTime },
    } = getState();
    const currentTrackTimeId = dataCopy.findIndex(
      (el) => el.id === updatedCurrentTrackTime.id,
    );
    if (currentTrackTimeId !== -1) {
      dataCopy.splice(currentTrackTimeId, 1);
    }
    return dispatch({ type: TRACK_TIMES_FETCHING_DONE, payload: dataCopy });
  } catch (err) {
    return dispatch({ type: TRACK_TIMES_FETCHING_ERROR, payload: err });
  }
};
export const addTrackTime = (trackTime) => async (dispatch, getState) => {
  dispatch({ type: TRACK_TIMES_ADDING });
  try {
    const { data } = await createTrackTimeAPI(trackTime);
    const {
      trackTimes: { trackTimes },
    } = getState();
    const trackTimesCopy = [...trackTimes, data];
    return dispatch({ type: TRACK_TIMES_ADDING_DONE, payload: trackTimesCopy });
  } catch (err) {
    return dispatch({ type: TRACK_TIMES_ADDING_ERROR, payload: err });
  }
};
export const updateTrackTime = (id, trackTime) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: TRACK_TIMES_UPDATING });
  try {
    const { data } = await updateTrackTimeAPI(id, trackTime);
    const { trackTimes } = getState();
    const trackTimesCopy = helperReplaceObjectInArray(
      trackTimes,
      'trackTimes',
      data,
    );
    return dispatch({
      type: TRACK_TIMES_UPDATING_DONE,
      payload: trackTimesCopy,
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIMES_UPDATING_ERROR, payload: err });
  }
};
export const deleteTrackTime = (id) => async (dispatch, getState) => {
  dispatch({ type: TRACK_TIMES_DELETING });
  try {
    await deleteTrackTimeAPI(id);
    const {
      trackTimes: { trackTimes },
    } = getState();
    const idIndex = trackTimes.findIndex((el) => el.id === id);
    const trackTimesCopy = helperRemoveObjectFromArray(trackTimes, idIndex);
    return dispatch({
      type: TRACK_TIMES_DELETING_DONE,
      payload: trackTimesCopy,
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIMES_DELETING_ERROR, payload: err });
  }
};
export const getTrackTimeNames = () => async (dispatch) => {
  dispatch({ type: TRACK_TIME_NAMES_FETCHING });
  try {
    const { data } = await getTrackTimeNamesAPI();
    const dataCopy = [...data];
    for (let i = 0; i < dataCopy.length; i += 1) {
      const trackTimeName = dataCopy[i];
      if (trackTimeName.name === 'Break') {
        dispatch({
          type: TRACK_TIME_NAME_SET_BREAK_TIME,
          payload: trackTimeName,
        });
        const breakTimeId = dataCopy.findIndex(
          (el) => el.id === trackTimeName.id,
        );
        if (breakTimeId !== -1) {
          dataCopy.splice(breakTimeId, 1);
        }
        break;
      }
    }

    return dispatch({
      type: TRACK_TIME_NAMES_FETCHING_DONE,
      payload: dataCopy,
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIME_NAMES_FETCHING_ERROR, payload: err });
  }
};
export const addTrackTimeName = (name) => async (dispatch, getState) => {
  dispatch({ type: TRACK_TIME_NAMES_ADDING });
  try {
    const { data } = await createTrackTimeNameAPI(name);
    const {
      trackTimeNames: { trackTimeNames },
    } = getState();
    return dispatch({
      type: TRACK_TIME_NAMES_ADDING_DONE,
      payload: [...trackTimeNames, data],
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIME_NAMES_ADDING_ERROR, payload: err });
  }
};
export const updateTrackTimeName = (id, trackTimeName) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: TRACK_TIME_NAMES_UPDATING });
  try {
    const { data } = await updateTrackTimeNameAPI(id, trackTimeName);
    const { trackTimeNames } = getState();
    const trackTimeNamesCopy = helperReplaceObjectInArray(
      trackTimeNames,
      'trackTimeNames',
      data,
    );
    return dispatch({
      type: TRACK_TIME_NAMES_UPDATING_DONE,
      payload: trackTimeNamesCopy,
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIME_NAMES_UPDATING_ERROR, payload: err });
  }
};
export const deleteTrackTimeName = (id) => async (dispatch, getState) => {
  dispatch({ type: TRACK_TIME_NAMES_DELETING });
  try {
    await deleteTrackTimeNameAPI(id);
    const {
      trackTimeNames: { trackTimeNames },
    } = getState();
    const idIndex = trackTimeNames.findIndex((el) => el.id === id);
    const trackTimeNamesCopy = helperRemoveObjectFromArray(
      trackTimeNames,
      idIndex,
    );
    return dispatch({
      type: TRACK_TIME_NAMES_DELETING_DONE,
      payload: trackTimeNamesCopy,
    });
  } catch (err) {
    return dispatch({ type: TRACK_TIME_NAMES_DELETING_ERROR, payload: err });
  }
};
export const updateTrackTimePreferences = () => async (dispatch) => {
  dispatch({ type: TRACK_TIME_PREFERENCES_UPDATING });
  try {
    const { data } = await updateTrackTimePreferencesAPI();
    return dispatch({
      type: TRACK_TIME_PREFERENCES_UPDATING_DONE,
      payload: data,
    });
  } catch (err) {
    return dispatch({
      type: TRACK_TIME_PREFERENCES_UPDATING_ERROR,
      payload: err,
    });
  }
};
export const clearTimeTracker = () => ({ type: TIME_TRACKER_CLEAR });
