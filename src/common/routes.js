export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ROUTE
    : 'http://127.0.0.1:8000/api';

export const profileUrl = '/profile/';
export const userUrl = '/user/';

export const userAnalyticsUrl = '/useranalytics/';
export const userAnalyticThresholdsUrl = '/useranalyticthresholds/';

export const habitUrl = '/habits/';
export const todoUrl = '/todos/';
export const dailiesUrl = '/dailies/';

export const savedPostsUrl = '/savedposts/';
export const postsUrl = '/posts/';
export const titlesUrl = '/titles/';

export const viceUrl = '/vices/';
export const viceAnalyticUrl = '/viceanalytics/';

export const trackTimeNamesUrl = '/tracktimenames/';
export const trackTimesUrl = '/tracktimes/';
export const trackTimePreferencesUrl = '/tracktimepreferences/';
