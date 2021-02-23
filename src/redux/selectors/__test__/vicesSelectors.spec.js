import * as selectors from '../vicesSelectors';

describe('#VicesSelectors', () => {
  const state1 = {
    vices: {
      viceAnalytics: [
        {
          id: 1,
          date: new Date(),
          frequency: 1,
        },
      ],
      cache: false,
      loading: false,
      error: {},
    },
  };
  const state2 = {
    vices: {
      viceAnalytics: [],
      cache: true,
      loading: true,
      error: {
        message: 'This is an error',
      },
    },
  };
  it('#getVicesState', () => {
    expect(selectors.getVicesState(state1)).toEqual(state1.vices);
    expect(selectors.getVicesState(state2)).toEqual(state2.vices);
  });
  it('#getVicesViceAnalytics', () => {
    expect(selectors.getVicesViceAnalytics(state1)).toEqual(
      state1.vices.viceAnalytics,
    );
    expect(selectors.getVicesViceAnalytics(state2)).toEqual(
      state2.vices.viceAnalytics,
    );
  });
  it('#getVicesLoading', () => {
    expect(selectors.getVicesLoading(state1)).toEqual(state1.vices.loading);
    expect(selectors.getVicesLoading(state2)).toEqual(state2.vices.loading);
  });
  it('#getVicesError', () => {
    expect(selectors.getVicesError(state1)).toEqual(state1.vices.error);
    expect(selectors.getVicesError(state2)).toEqual(state2.vices.error);
  });
  it('#getVicesCache', () => {
    expect(selectors.getVicesCache(state1)).toEqual(false);
    expect(selectors.getVicesCache(state2)).toEqual(true);
  });
});
