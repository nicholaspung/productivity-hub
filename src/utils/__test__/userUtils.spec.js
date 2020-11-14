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
    const analytics = [
      {
        label: 'hi',
        id: 1,
        action: 'click',
        frequency: 1,
        date: 1,
      },
      {
        label: 'there',
        id: 2,
        action: 'click',
        frequency: 5,
        date: 1,
      },
      {
        label: 'friend',
        id: 3,
        action: 'click',
        frequency: 6,
        date: 1,
      },
      {
        label: 'we',
        id: 4,
        action: 'click',
        frequency: 7,
        date: 1,
      },
      {
        label: 'see',
        id: 5,
        action: 'click',
        frequency: 12,
        date: 1,
      },
      {
        label: 'hi',
        id: 6,
        action: 'click',
        frequency: 64,
        date: 2,
      },
      {
        label: 'there',
        id: 7,
        action: 'click',
        frequency: 1,
        date: 2,
      },
      {
        label: 'friend',
        id: 8,
        action: 'click',
        frequency: 0,
        date: 2,
      },
      {
        label: 'we',
        id: 9,
        action: 'click',
        frequency: 0,
        date: 2,
      },
      {
        label: 'see',
        id: 10,
        action: 'click',
        frequency: 0,
        date: 2,
      },
      {
        label: 'hi',
        id: 11,
        action: 'click',
        frequency: 4,
        date: 3,
      },
    ];
    expect(userUtils.userAnalyticsWithFrequenciesForDate(analytics)).toEqual([
      {
        id: 1,
        label: 'hi',
        action: 'click',
        frequencies: { 1: 1, 2: 64, 3: 4 },
      },
      {
        id: 2,
        label: 'there',
        action: 'click',
        frequencies: { 1: 5, 2: 1 },
      },
      {
        id: 3,
        label: 'friend',
        action: 'click',
        frequencies: { 1: 6, 2: 0 },
      },
      {
        id: 4,
        label: 'we',
        action: 'click',
        frequencies: { 1: 7, 2: 0 },
      },
      {
        id: 5,
        label: 'see',
        action: 'click',
        frequencies: { 1: 12, 2: 0 },
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
      apps: 'HABIT_TRACKER',
      user: 7,
    };
    const authUser = {
      uid: 'uid',
      isAnonymous: false,
    };
    expect(userUtils.helperLoggedIn(authUser, data)).toEqual({
      updatedAuthUser: {
        ...authUser,
        user: data.user,
      },
      apps: data.apps,
    });
  });
});
