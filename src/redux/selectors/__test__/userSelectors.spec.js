import * as selectors from '../userSelectors';
import { getDateTransform } from '../../../utils/dateUtils';

describe('#UserSelectors', () => {
  const state1 = {
    user: {
      info: {
        email: 'fake@email.com',
        userId: 4,
        isAnonymous: false,
      },
      apps: '',
      loading: true,
      error: {},
      userAnalytics: [],
      id: 3,
    },
  };
  const state2 = {
    user: {
      info: {
        email: 'anonymous@email.com',
        isAnonymous: true,
        userId: 6,
      },
      apps: 'HABIT_TRACKER',
      loading: true,
      error: { message: 'error' },
      userAnalytics: [
        {
          label: 'Label 1',
          threshold: { threshold: 5 },
          frequency: 11,
          date: '2020-06-01',
        },
        {
          label: 'Label 2',
          threshold: { threshold: 10 },
          frequency: 22,
          date: '2020-01-15',
        },
        {
          label: 'Label 3',
          threshold: null,
          frequency: 33,
          date: getDateTransform(new Date()),
        },
      ],
      id: 2,
    },
  };
  it('#getUserState', () => {
    expect(selectors.getUserState(state1)).toEqual(state1.user);
    expect(selectors.getUserState(state2)).toEqual(state2.user);
  });
  it('#getUserInfo', () => {
    expect(selectors.getUserInfo(state1)).toEqual(state1.user.info);
    expect(selectors.getUserInfo(state2)).toEqual(state2.user.info);
  });
  it('#getUserApps', () => {
    expect(selectors.getUserApps(state1)).toEqual(state1.user.apps);
    expect(selectors.getUserApps(state2)).toEqual(state2.user.apps);
  });
  it('#isLoggedIn', () => {
    expect(selectors.isLoggedIn(state1)).toEqual(
      Boolean(state1.user.info.email),
    );
    expect(selectors.isLoggedIn(state2)).toEqual(
      Boolean(state2.user.info.email),
    );
  });
  it('#isAnonymous', () => {
    expect(selectors.isAnonymous(state1)).toEqual(
      Boolean(state1.user.info.isAnonymous),
    );
    expect(selectors.isAnonymous(state2)).toEqual(
      Boolean(state2.user.info.isAnonymous),
    );
  });
  it('#isUserLoading', () => {
    expect(selectors.isUserLoading(state1)).toEqual(
      Boolean(state1.user.loading),
    );
    expect(selectors.isUserLoading(state2)).toEqual(
      Boolean(state2.user.loading),
    );
  });
  it('#getUserError', () => {
    expect(selectors.getUserError(state1)).toEqual(state1.user.error);
    expect(selectors.getUserError(state2)).toEqual(state2.user.error);
  });
  it('#hasError', () => {
    expect(selectors.hasError(state1)).toEqual(
      Boolean(Object.keys(state1.user.error).length),
    );
    expect(selectors.hasError(state2)).toEqual(
      Boolean(Object.keys(state2.user.error).length),
    );
  });
  it('#getUserAnalytics', () => {
    expect(selectors.getUserAnalytics(state1)).toEqual(
      state1.user.userAnalytics,
    );
    expect(selectors.getUserAnalytics(state2)).toEqual(
      state2.user.userAnalytics,
    );
  });
  it('#getUserAnalyticLabelFrequencyAndThreshold', () => {
    const defaultNumber = 9999;
    expect(
      selectors.getUserAnalyticLabelFrequencyAndThreshold(state1, 'Anything'),
    ).toEqual({ frequency: defaultNumber, threshold: defaultNumber });
    expect(
      selectors.getUserAnalyticLabelFrequencyAndThreshold(state2, 'Label 1'),
    ).toEqual({
      frequency: state2.user.userAnalytics[0].frequency,
      threshold: state2.user.userAnalytics[0].threshold.threshold,
    });
    expect(
      selectors.getUserAnalyticLabelFrequencyAndThreshold(state2, 'Label 2'),
    ).toEqual({
      frequency: state2.user.userAnalytics[1].frequency,
      threshold: state2.user.userAnalytics[1].threshold.threshold,
    });
    expect(
      selectors.getUserAnalyticLabelFrequencyAndThreshold(state2, 'Label 3'),
    ).toEqual({
      frequency: state2.user.userAnalytics[2].frequency,
      threshold: defaultNumber,
    });
  });
});
