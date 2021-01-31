import { FILTER_OPTIONS } from '../constants/postSaverConstants';

export const sortSavedPostTitles = (a, b) => {
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();
  if (aTitle < bTitle) return -1;
  if (aTitle > bTitle) return 1;
  return 0;
};
export const sortTitles = (a, b, filter) => {
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();
  if (filter === FILTER_OPTIONS['A-Z']) {
    if (aTitle < bTitle) return -1;
    if (aTitle > bTitle) return 1;
    return 0;
  }
  if (filter === FILTER_OPTIONS['Z-A']) {
    if (aTitle > bTitle) return -1;
    if (aTitle < bTitle) return 1;
    return 0;
  }
  return 0;
};
