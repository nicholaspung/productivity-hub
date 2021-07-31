import { axiosWithAuth } from './baseApi';
import {
  trackTimeNamesUrl,
  trackTimesUrl,
  trackTimePreferencesUrl,
} from '../common/routes';
import { getDateTransform } from '../utils/dateUtils';

export const getTrackTimes = async () =>
  (await axiosWithAuth()).get(trackTimesUrl);

export const createTrackTime = async (trackTime) =>
  (await axiosWithAuth()).post(trackTimesUrl, trackTime);

export const updateTrackTime = async (id, trackTime) =>
  (await axiosWithAuth()).patch(`${trackTimesUrl}${id}/`, trackTime);

export const deleteTrackTime = async (id) =>
  (await axiosWithAuth()).delete(`${trackTimesUrl}${id}/`);

export const getTrackTimeNames = async () =>
  (await axiosWithAuth()).get(trackTimeNamesUrl);

export const createTrackTimeName = async (trackTimeName) =>
  (await axiosWithAuth()).post(trackTimeNamesUrl, trackTimeName);

export const updateTrackTimeName = async (
  id,
  trackTimeName,
  date = new Date(),
) =>
  (await axiosWithAuth()).patch(
    `${trackTimeNamesUrl}${id}/?date=${getDateTransform(date)}`,
    trackTimeName,
  );

export const deleteTrackTimeName = async (id) =>
  (await axiosWithAuth()).delete(`${trackTimeNamesUrl}${id}/`);

export const updateTrackTimePreferences = async (id) =>
  (await axiosWithAuth()).patch(`${trackTimePreferencesUrl}${id}/`);
