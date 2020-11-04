import axios from 'axios';
import { getIdToken } from './firebase/utils';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ROUTE
    : 'http://127.0.0.1:8000/api';

export const axiosWithAuth = async () => {
  const token = await getIdToken();
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: baseUrl,
  });
};

export const userAnalyticsUrl = '/useranalytics/';

export const createUserAnalytics = async () =>
  (await axiosWithAuth()).post(userAnalyticsUrl);

export const trackSpecificEventsFromUser = async (label) =>
  (await axiosWithAuth()).post('/useranalytics/', { label });
