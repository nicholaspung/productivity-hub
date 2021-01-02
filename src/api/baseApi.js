import axios from 'axios';
import { getIdToken } from '../firebase/utils';
import { baseUrl, userAnalyticsUrl } from '../common/routes';

export const axiosWithAuth = async () => {
  const token = await getIdToken();
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: baseUrl,
  });
};

export const createUserAnalytics = async () =>
  (await axiosWithAuth()).post(userAnalyticsUrl);

export const trackSpecificEventsFromUser = async (label) =>
  (await axiosWithAuth()).post(userAnalyticsUrl, { label });
