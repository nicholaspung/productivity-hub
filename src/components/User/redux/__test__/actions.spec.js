import { helperLoggedIn } from '../actions';

describe('#UserActions', () => {
  it('#helperLoggedIn', () => {
    const data = {
      apps: 'HABIT_TRACKER',
      user: 7,
    };
    const authUser = {
      uid: 'uid',
      isAnonymous: false,
    };
    expect(helperLoggedIn(authUser, data)).toEqual({
      updatedAuthUser: {
        ...authUser,
        user: data.user,
      },
      apps: data.apps,
    });
  });
});
