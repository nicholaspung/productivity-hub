import { axiosWithAuth } from './baseApi';
import {
  profileUrl,
  userUrl,
  userAnalyticsUrl,
  userAnalyticThresholdsUrl,
} from '../common/routes';

export const getProfile = async () => (await axiosWithAuth()).get(profileUrl);

export const updateProfile = async (id, profile) =>
  (await axiosWithAuth()).patch(`${profileUrl}${id}/`, profile);

export const deleteUser = async (id) =>
  (await axiosWithAuth()).delete(`${userUrl}${id}/`);

export const getUserAnalytics = async () =>
  (await axiosWithAuth()).get(userAnalyticsUrl);

export const updateUserAnalyticThreshold = async (id, threshold) =>
  (await axiosWithAuth()).patch(
    `${userAnalyticThresholdsUrl}${id}/`,
    threshold,
  );

export const createUserAnalyticThreshold = async (viceThreshold) =>
  (await axiosWithAuth()).post(userAnalyticThresholdsUrl, viceThreshold);
