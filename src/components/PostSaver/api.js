import { axiosWithAuth } from "../../api";

const savedPostsUrl = "/savedposts/";
const postsUrl = "/posts/";
const titlesUrl = "/titles/";

export const getPosts = async (newUrl) => {
  let response;
  try {
    if (Boolean(newUrl)) {
      response = await (await axiosWithAuth()).get(newUrl);
    } else {
      response = await (await axiosWithAuth()).get(postsUrl);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getTitles = async () => {
  try {
    const response = await (await axiosWithAuth()).get(titlesUrl);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addTitle = async (title) => {
  try {
    const response = await (await axiosWithAuth()).post(titlesUrl, title);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateTitle = async (id, title) => {
  try {
    const response = await (await axiosWithAuth()).put(
      `${titlesUrl}${id}/`,
      title
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteTitle = async (id) => {
  try {
    const response = await (await axiosWithAuth()).delete(`${titlesUrl}${id}/`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getSavedPosts = async () => {
  try {
    const response = await (await axiosWithAuth()).get(savedPostsUrl);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateSavedPost = async (id) => {
  try {
    const response = await (await axiosWithAuth()).put(
      `${savedPostsUrl}${id}/`,
      { seen: true }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
