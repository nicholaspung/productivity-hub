import { axiosWithAuth } from './baseApi';
import { viceUrl, viceAnalyticUrl } from '../common/routes';

export const createViceAnalytics = async () =>
  (await axiosWithAuth()).post(viceAnalyticUrl);

export const incrementFrequencyForViceAnalytic = async (id) =>
  (await axiosWithAuth()).patch(`${viceAnalyticUrl}${id}/`);

export const addVice = async (vice) =>
  (await axiosWithAuth()).post(viceUrl, vice);

export const updateVice = async (id, newVice) =>
  (await axiosWithAuth()).patch(`${viceUrl}${id}/`, newVice);

export const deleteVice = async (id) =>
  (await axiosWithAuth()).delete(`${viceUrl}${id}/`);