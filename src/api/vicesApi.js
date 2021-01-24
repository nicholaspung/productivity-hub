import { axiosWithAuth } from './baseApi';
import { viceUrl, viceAnalyticUrl, viceThresholdUrl } from '../common/routes';

export const getViceAnalytics = async () =>
  (await axiosWithAuth()).get(viceAnalyticUrl);

export const createViceAnalytics = async () =>
  (await axiosWithAuth()).post(viceAnalyticUrl);

export const addFrequencyForViceAnalytic = async (id) =>
  (await axiosWithAuth()).patch(`${viceAnalyticUrl}${id}/`);

export const addVice = async (vice) =>
  (await axiosWithAuth()).post(viceUrl, vice);

export const updateVice = async (id, newVice) =>
  (await axiosWithAuth()).patch(`${viceUrl}${id}/`, newVice);

export const deleteVice = async (id) =>
  (await axiosWithAuth()).delete(`${viceUrl}${id}/`);

export const createViceThreshold = async (name) =>
  (await axiosWithAuth()).post(viceThresholdUrl, { name });

export const updateViceThreshold = async (id, threshold) =>
  (await axiosWithAuth()).patch(`${viceThresholdUrl}${id}/`, { threshold });
