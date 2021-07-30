import * as utils from '../timeTrackerSelectors';

describe('#TimeTrackerSelectors', () => {
  const state1 = {
    trackTimes: {
      trackTimes: [],
      loading: false,
      error: {},
      currentTrackTime: {},
    },
    trackTimeNames: {
      trackTimeNames: [],
      loading: false,
      error: {},
      breakTime: {},
    },
    user: {
      app_preferences: {
        time_tracker: {
          enable_pomodoro: true,
          pomodoro_interval_time: '00:25:00',
          break_interval_time: '00:05:00',
        },
      },
    },
  };
  const state2 = {
    trackTimes: {
      trackTimes: ['hi'],
      loading: true,
      error: { name: 'there' },
      currentTrackTime: { name: 'you', id: 1 },
    },
    trackTimeNames: {
      trackTimeNames: ['be'],
      loading: true,
      error: { name: 'while' },
      breakTime: { name: 'here' },
    },
    user: {
      app_preferences: {},
    },
  };
  it('#getTrackTimesState', () => {
    expect(utils.getTrackTimesState(state1)).toEqual(state1.trackTimes);
    expect(utils.getTrackTimesState(state2)).toEqual(state2.trackTimes);
  });
  it('#getTrackTimes', () => {
    expect(utils.getTrackTimes(state1)).toEqual(state1.trackTimes.trackTimes);
    expect(utils.getTrackTimes(state2)).toEqual(state2.trackTimes.trackTimes);
  });
  it('#getTrackTimesLoading', () => {
    expect(utils.getTrackTimesLoading(state1)).toEqual(
      state1.trackTimes.loading,
    );
    expect(utils.getTrackTimesLoading(state2)).toEqual(
      state2.trackTimes.loading,
    );
  });
  it('#getTrackTimesError', () => {
    expect(utils.getTrackTimesError(state1)).toEqual(state1.trackTimes.error);
    expect(utils.getTrackTimesError(state2)).toEqual(state2.trackTimes.error);
  });
  it('#getTrackTimeCurrentTrackTime', () => {
    expect(utils.getTrackTimeCurrentTrackTime(state1)).toEqual(
      state1.trackTimes.currentTrackTime,
    );
  });
  it('#hasCurrentTrackTime', () => {
    expect(utils.hasCurrentTrackTime(state1)).toEqual(false);
    expect(utils.hasCurrentTrackTime(state2)).toEqual(true);
  });
  it('#getTrackTimeNamesState', () => {
    expect(utils.getTrackTimeNamesState(state1)).toEqual(state1.trackTimeNames);
    expect(utils.getTrackTimeNamesState(state2)).toEqual(state2.trackTimeNames);
  });
  it('#getTrackTimeNames', () => {
    expect(utils.getTrackTimeNames(state1)).toEqual(
      state1.trackTimeNames.trackTimeNames,
    );
    expect(utils.getTrackTimeNames(state2)).toEqual(
      state2.trackTimeNames.trackTimeNames,
    );
  });
  it('#getTrackTimeNamesLoading', () => {
    expect(utils.getTrackTimeNamesLoading(state1)).toEqual(
      state1.trackTimeNames.loading,
    );
    expect(utils.getTrackTimeNamesLoading(state2)).toEqual(
      state2.trackTimeNames.loading,
    );
  });
  it('#getTrackTimeNamesError', () => {
    expect(utils.getTrackTimeNamesError(state1)).toEqual(
      state1.trackTimeNames.error,
    );
    expect(utils.getTrackTimeNamesError(state2)).toEqual(
      state2.trackTimeNames.error,
    );
  });
  it('#getTrackTimeNamesBreakTime', () => {
    expect(utils.getTrackTimeNamesBreakTime(state1)).toEqual(
      state1.trackTimeNames.breakTime,
    );
    expect(utils.getTrackTimeNamesBreakTime(state2)).toEqual(
      state2.trackTimeNames.breakTime,
    );
  });
  it('#getTimeTrackerPreferences', () => {
    expect(utils.getTimeTrackerPreferences(state1)).toEqual(
      state1.user.app_preferences.time_tracker,
    );
    expect(utils.getTimeTrackerPreferences(state2)).toEqual({});
  });
  it('#getTimeTrackerEnablePomodoro', () => {
    expect(utils.getTimeTrackerEnablePomodoro(state1)).toEqual(
      state1.user.app_preferences.time_tracker.enable_pomodoro,
    );
    expect(utils.getTimeTrackerEnablePomodoro(state2)).toEqual(false);
  });
  it('#getTimeTrackerPomodoroIntervalTime', () => {
    expect(utils.getTimeTrackerPomodoroIntervalTime(state1)).toEqual(
      state1.user.app_preferences.time_tracker.pomodoro_interval_time,
    );
    expect(utils.getTimeTrackerPomodoroIntervalTime(state2)).toEqual('');
  });
  it('#getTimeTrackerBreakIntervalTime', () => {
    expect(utils.getTimeTrackerBreakIntervalTime(state1)).toEqual(
      state1.user.app_preferences.time_tracker.break_interval_time,
    );
    expect(utils.getTimeTrackerBreakIntervalTime(state2)).toEqual('');
  });
});
