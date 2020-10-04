import * as selectors from '../selectors';

describe('#UserSelectors', () => {
  const state1 = {
    users: {
      info: {
        uid: '',
        isAnonymous: false,
        userId: undefined,
      },
      apps: '',
      loading: true,
      error: {},
    },
  };
  const state2 = {
    users: {
      info: {
        uid: 'this is a uid',
        isAnonymous: true,
        userId: 6,
      },
      apps: 'HABIT_TRACKER',
      loading: true,
      error: { message: 'error' },
    },
  };
  it('#getUserState', () => {
    expect(selectors.getUserState(state1)).toEqual(state1.users);
    expect(selectors.getUserState(state2)).toEqual(state2.users);
  });
  it('#getUserInfo', () => {
    expect(selectors.getUserInfo(state1)).toEqual(state1.users.info);
    expect(selectors.getUserInfo(state2)).toEqual(state2.users.info);
  });
  it('#getUserApps', () => {
    expect(selectors.getUserApps(state1)).toEqual(state1.users.apps);
    expect(selectors.getUserApps(state2)).toEqual(state2.users.apps);
  });
  it('#isLoggedIn', () => {
    expect(selectors.isLoggedIn(state1)).toEqual(
      Boolean(state1.users.info.uid),
    );
    expect(selectors.isLoggedIn(state2)).toEqual(
      Boolean(state2.users.info.uid),
    );
  });
  it('#isAnonymous', () => {
    expect(selectors.isAnonymous(state1)).toEqual(
      Boolean(state1.users.info.isAnonymous),
    );
    expect(selectors.isAnonymous(state2)).toEqual(
      Boolean(state2.users.info.isAnonymous),
    );
  });
  it('#isUserLoading', () => {});
  expect(selectors.isUserLoading(state1)).toEqual(
    Boolean(state1.users.loading),
  );
  expect(selectors.isUserLoading(state2)).toEqual(
    Boolean(state2.users.loading),
  );
  it('#getUserError', () => {
    expect(selectors.getUserError(state1)).toEqual(state1.users.error);
    expect(selectors.getUserError(state2)).toEqual(state2.users.error);
  });
  it('#hasError', () => {
    expect(selectors.hasError(state1)).toEqual(
      Boolean(Object.keys(state1.users.error).length),
    );
    expect(selectors.hasError(state2)).toEqual(
      Boolean(Object.keys(state2.users.error).length),
    );
  });
});
