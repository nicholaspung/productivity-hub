import * as utils from '../savedPostUtils';
import { FILTER_OPTIONS } from '../../constants/postSaverConstants';

describe('#SavedPostUtils', () => {
  it('#sortSavedPostTitles', () => {
    const savedPosts = [{ title: 'b' }, { title: 'a' }, { title: 'c' }];
    savedPosts.sort(utils.sortSavedPostTitles);
    expect(savedPosts).toEqual([
      { title: 'a' },
      { title: 'b' },
      { title: 'c' },
    ]);
  });
  it('#sortTitles', () => {
    const titles = [{ title: 'b' }, { title: 'a' }, { title: 'c' }];
    titles.sort((a, b) => utils.sortTitles(a, b, FILTER_OPTIONS['A-Z']));
    expect(titles).toEqual([{ title: 'a' }, { title: 'b' }, { title: 'c' }]);
    titles.sort((a, b) => utils.sortTitles(a, b, FILTER_OPTIONS['Z-A']));
    expect(titles).toEqual([{ title: 'c' }, { title: 'b' }, { title: 'a' }]);
  });
});
