import { axiosWithAuth } from "../../api";

const savedPostsUrl = "/savedposts/";
const postsUrl = "/posts/";
const titlesUrl = "/titles/";

export const getPosts = async (newUrl) => {
  if (Boolean(newUrl)) {
    return (await axiosWithAuth()).get(newUrl);
  } else {
    return (await axiosWithAuth()).get(postsUrl);
  }
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
