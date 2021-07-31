import { axiosWithAuth } from './baseApi';
import {
  trackTimeNamesUrl,
  trackTimesUrl,
  trackTimePreferencesUrl,
} from '../common/routes';
import { getDateTransform } from '../utils/dateUtils';

export const getTrackTimes = async (date = new Date()) =>
  (await axiosWithAuth()).get(
    `${trackTimesUrl}?date=${getDateTransform(date)}`,
  );

export const createTrackTime = async (trackTime) =>
  (await axiosWithAuth()).post(trackTimesUrl, trackTime);

export const updateTrackTime = async (id, trackTime, date = new Date()) =>
  (await axiosWithAuth()).patch(
    `${trackTimesUrl}${id}/?date=${getDateTransform(date)}`,
    trackTime,
  );

export const deleteTrackTime = async (id, date = new Date()) =>
  (await axiosWithAuth()).delete(
    `${trackTimesUrl}${id}/?date=${getDateTransform(date)}`,
  );

export const getTrackTimeNames = async () =>
  (await axiosWithAuth()).get(trackTimeNamesUrl);

export const createTrackTimeName = async (trackTimeName) =>
  (await axiosWithAuth()).post(trackTimeNamesUrl, trackTimeName);

export const updateTrackTimeName = async (id, trackTimeName) =>
  (await axiosWithAuth()).patch(`${trackTimeNamesUrl}${id}/`, trackTimeName);

export const deleteTrackTimeName = async (id) =>
  (await axiosWithAuth()).delete(`${trackTimeNamesUrl}${id}/`);

export const updateTrackTimePreferences = async (id) =>
  (await axiosWithAuth()).patch(`${trackTimePreferencesUrl}${id}/`);
