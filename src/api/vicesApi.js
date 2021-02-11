import { axiosWithAuth } from './baseApi';
import { viceUrl, viceAnalyticUrl } from '../common/routes';
import { getDateTransform } from '../utils/dateUtils';

export const createViceAnalytics = async (date = new Date()) =>
  (await axiosWithAuth()).post(
    `${viceAnalyticUrl}?date=${getDateTransform(date)}`,
  );

export const incrementFrequencyForViceAnalytic = async (id, frequency) =>
  (await axiosWithAuth()).patch(`${viceAnalyticUrl}${id}/`, frequency);

export const addVice = async (vice) =>
  (await axiosWithAuth()).post(viceUrl, vice);

export const updateVice = async (id, newVice) =>
  (await axiosWithAuth()).patch(`${viceUrl}${id}/`, newVice);

export const deleteVice = async (id) =>
  (await axiosWithAuth()).delete(`${viceUrl}${id}/`);
