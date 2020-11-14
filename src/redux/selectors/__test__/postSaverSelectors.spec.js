import * as selectors from '../postSaverSelectors';

describe('#PostSaverSelectors', () => {
  const state1 = {
    posts: {
      fetchedPosts: {
        count: 0,
        next: '',
        previous: '',
        results: [],
      },
      posts: {},
      loading: false,
      error: {},
    },
    titles: {
      titles: [],
      loading: false,
      error: {},
    },
    savedPosts: {
      savedPosts: [],
      loading: false,
      error: {},
    },
  };
  const state2 = {
    posts: {
      fetchedPosts: {
        count: 5,
        next: 'nexturl',
        previous: 'previousurl',
        results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      },
      posts: {
        's/': {
          count: 5,
          next: 'nexturl',
          previous: 'previousurl',
          results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        },
      },
      loading: false,
      error: {},
    },
    titles: {
      titles: [{ id: 1 }, { id: 2 }],
      loading: false,
      error: {},
    },
    savedPosts: {
      savedPosts: [{ id: 1 }, { id: 22 }, { id: 3 }],
      loading: false,
      error: {},
    },
  };
  it('#getPostsState', () => {
    expect(selectors.getPostsState(state1)).toEqual(state1.posts);
    expect(selectors.getPostsState(state2)).toEqual(state2.posts);
  });
  it('#getPostsFetchedPosts', () => {
    expect(selectors.getPostsFetchedPosts(state1)).toEqual(
      state1.posts.fetchedPosts,
    );
    expect(selectors.getPostsFetchedPosts(state2)).toEqual(
      state2.posts.fetchedPosts,
    );
  });
  it('#getPostsPosts', () => {
    expect(selectors.getPostsPosts(state1)).toEqual(state1.posts.posts);
    expect(selectors.getPostsPosts(state2)).toEqual(state2.posts.posts);
  });
  it('#getPostsLoading', () => {
    expect(selectors.getPostsLoading(state1)).toEqual(state1.posts.loading);
    expect(selectors.getPostsLoading(state2)).toEqual(state2.posts.loading);
  });
  it('#getPostsError', () => {
    expect(selectors.getPostsError(state1)).toEqual(state1.posts.error);
    expect(selectors.getPostsError(state2)).toEqual(state2.posts.error);
  });
  it('#getTitlesState', () => {
    expect(selectors.getTitlesState(state1)).toEqual(state1.titles);
    expect(selectors.getTitlesState(state2)).toEqual(state2.titles);
  });
  it('#getTitlesTitles', () => {
    expect(selectors.getTitlesTitles(state1)).toEqual(state1.titles.titles);
    expect(selectors.getTitlesTitles(state2)).toEqual(state2.titles.titles);
  });
  it('#getTitlesLoading', () => {
    expect(selectors.getTitlesLoading(state1)).toEqual(state1.titles.loading);
    expect(selectors.getTitlesLoading(state2)).toEqual(state2.titles.loading);
  });
  it('#getTitlesError', () => {
    expect(selectors.getTitlesError(state1)).toEqual(state1.titles.error);
    expect(selectors.getTitlesError(state2)).toEqual(state2.titles.error);
  });
  it('#getSavedPostsState', () => {
    expect(selectors.getSavedPostsState(state1)).toEqual(state1.savedPosts);
    expect(selectors.getSavedPostsState(state2)).toEqual(state2.savedPosts);
  });
  it('#getSavedPostsSavedPosts', () => {
    expect(selectors.getSavedPostsSavedPosts(state1)).toEqual(
      state1.savedPosts.savedPosts,
    );
    expect(selectors.getSavedPostsSavedPosts(state2)).toEqual(
      state2.savedPosts.savedPosts,
    );
  });
  it('#getSavedPostsLoading', () => {
    expect(selectors.getSavedPostsLoading(state1)).toEqual(
      state1.savedPosts.loading,
    );
    expect(selectors.getSavedPostsLoading(state2)).toEqual(
      state2.savedPosts.loading,
    );
  });
  it('#getSavedPostsError', () => {
    expect(selectors.getSavedPostsError(state1)).toEqual(
      state1.savedPosts.error,
    );
    expect(selectors.getSavedPostsError(state2)).toEqual(
      state2.savedPosts.error,
    );
  });
});
