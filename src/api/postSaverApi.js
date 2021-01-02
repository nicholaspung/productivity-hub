import { axiosWithAuth } from './baseApi';
import { savedPostsUrl, postsUrl, titlesUrl } from '../common/routes';

export const getPosts = async (newUrl) => {
  if (newUrl) {
    return (await axiosWithAuth()).get(newUrl);
  }
  return (await axiosWithAuth()).get(postsUrl);
};

export const getTitles = async () => (await axiosWithAuth()).get(titlesUrl);

export const addTitle = async (title) =>
  (await axiosWithAuth()).post(titlesUrl, title);

export const updateTitle = async (id, title) =>
  (await axiosWithAuth()).put(`${titlesUrl}${id}/`, title);

export const deleteTitle = async (id) =>
  (await axiosWithAuth()).delete(`${titlesUrl}${id}/`);

export const getSavedPosts = async () =>
  (await axiosWithAuth()).get(savedPostsUrl);

export const updateSavedPost = async (id) =>
  (await axiosWithAuth()).put(`${savedPostsUrl}${id}/`, { seen: true });
