import * as userUtils from '../userUtils';

describe('#UserUtils', () => {
  it('#userAnalyticDates', () => {
    const analytics = [
      { date: 1 },
      { date: 2 },
      { date: 3 },
      { date: 1 },
      { date: 2 },
    ];
    expect(userUtils.userAnalyticDates(analytics)).toEqual([1, 2, 3]);
  });
  it('#userAnalyticsWithFrequenciesForDate', () => {
    const date1 = '2020-01-01';
    const date2 = '2020-01-04';
    const date3 = '2020-01-05';
    const analytics = [
      {
        label: 'hi',
        id: 1,
        action: 'click',
        frequency: 1,
        date: date1,
        threshold: {
          threshold: 1,
          id: 1,
        },
      },
      {
        label: 'there',
        id: 2,
        action: 'click',
        frequency: 5,
        date: date1,
        threshold: {
          threshold: 2,
          id: 2,
        },
      },
      {
        label: 'friend',
        id: 3,
        action: 'click',
        frequency: 6,
        date: date1,
        threshold: {
          threshold: 3,
          id: 3,
        },
      },
      {
        label: 'we',
        id: 4,
        action: 'click',
        frequency: 7,
        date: date1,
        threshold: {
          threshold: 4,
          id: 4,
        },
      },
      {
        label: 'see',
        id: 5,
        action: 'click',
        frequency: 12,
        date: date1,
        threshold: undefined,
      },
      {
        label: 'hi',
        id: 6,
        action: 'click',
        frequency: 64,
        date: date2,
        threshold: {
          threshold: 1,
          id: 1,
        },
      },
      {
        label: 'there',
        id: 7,
        action: 'click',
        frequency: 1,
        date: date2,
        threshold: {
          threshold: 2,
          id: 2,
        },
      },
      {
        label: 'friend',
        id: 8,
        action: 'click',
        frequency: 0,
        date: date2,
        threshold: {
          threshold: 3,
          id: 3,
        },
      },
      {
        label: 'we',
        id: 9,
        action: 'click',
        frequency: 0,
        date: date2,
        threshold: {
          threshold: 4,
          id: 4,
        },
      },
      {
        label: 'see',
        id: 10,
        action: 'click',
        frequency: 0,
        date: date2,
        threshold: {
          threshold: 5,
          id: 5,
        },
      },
      {
        label: 'hi',
        id: 11,
        action: 'click',
        frequency: 4,
        date: date3,
        threshold: {
          threshold: 1,
          id: 1,
        },
      },
    ];
    expect(userUtils.userAnalyticsWithFrequenciesForDate(analytics)).toEqual([
      {
        id: 1,
        label: 'hi',
        action: 'click',
        frequencies: { [date1]: 1, [date2]: 64, [date3]: 4 },
        threshold: 1,
        thresholdId: 1,
      },
      {
        id: 2,
        label: 'there',
        action: 'click',
        frequencies: { [date1]: 5, [date2]: 1, [date3]: 0 },
        threshold: 2,
        thresholdId: 2,
      },
      {
        id: 3,
        label: 'friend',
        action: 'click',
        frequencies: { [date1]: 6, [date2]: 0, [date3]: 0 },
        threshold: 3,
        thresholdId: 3,
      },
      {
        id: 4,
        label: 'we',
        action: 'click',
        frequencies: { [date1]: 7, [date2]: 0, [date3]: 0 },
        threshold: 4,
        thresholdId: 4,
      },
      {
        id: 5,
        label: 'see',
        action: 'click',
        frequencies: { [date1]: 12, [date2]: 0, [date3]: 0 },
        threshold: 5,
        thresholdId: 5,
      },
    ]);
  });
  it('#displayDateTransform', () => {
    const dateString1 = '2020-10-10';
    expect(userUtils.displayDateTransform(dateString1)).toEqual('10/10');
    expect(userUtils.displayDateTransform(dateString1, true)).toEqual('10');
    const dateString2 = '2020-01-01';
    expect(userUtils.displayDateTransform(dateString2)).toEqual('1/1');
    expect(userUtils.displayDateTransform(dateString2, true)).toEqual('1');
  });
  it('#helperLoggedIn', () => {
    const data = {
      apps: [{ id: 1, title: 'HABIT_TRACKER' }],
      user: 1,
      email: 'fake@gmail.com',
      is_anonymous: false,
      id: 1,
    };
    expect(userUtils.helperLoggedIn(data)).toEqual({
      transformedUser: {
        userId: data.user,
        email: data.email,
        isAnonymous: data.is_anonymous,
        profileId: data.id,
      },
      apps: data.apps,
    });
  });
  it('#helperAttachNewThresholdToUserAnalytics', () => {
    const data = {
      id: 5,
      label: 'Label',
      threshold: 4,
      user: 5,
    };
    const analytics = [
      {
        action: 'Click',
        date: '2020-10-10',
        frequency: 4,
        id: 1,
        label: 'Label',
        threshold: null,
        user: 5,
      },
      {
        action: 'Click',
        date: '2020-10-10',
        frequency: 4,
        id: 1,
        label: 'Label 1',
        threshold: null,
        user: 5,
      },
      {
        action: 'Click',
        date: '2020-10-10',
        frequency: 4,
        id: 1,
        label: 'Label 2',
        threshold: null,
        user: 5,
      },
      {
        action: 'Click',
        date: '2020-10-15',
        frequency: 4,
        id: 1,
        label: 'Label',
        threshold: {
          id: 5,
          label: 'Label',
          threshold: 19,
          user: 5,
        },
        user: 5,
      },
    ];
    const resultAnalytics = [...analytics];
    resultAnalytics[0].threshold = data;
    resultAnalytics[3].threshold = data;
    expect(
      userUtils.helperAttachNewThresholdToUserAnalytics(data, analytics),
    ).toEqual(resultAnalytics);
  });
});
