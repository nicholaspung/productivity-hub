import { axiosWithAuth } from "../../api";

const savedPostsUrl = "/savedposts/";
const postsUrl = "/posts/";
const titlesUrl = "/titles/";

export const getPosts = async () => {
  try {
    const response = await (await axiosWithAuth()).get(postsUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getTitles = async () => {
  try {
    const response = await (await axiosWithAuth()).get(titlesUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addTitle = async (title) => {
  try {
    const response = await (await axiosWithAuth()).post(titlesUrl, title);
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteTitle = async (id) => {
  try {
    const response = await (await axiosWithAuth()).delete(`${titlesUrl}${id}/`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getSavedPosts = async () => {
  try {
    const response = await (await axiosWithAuth()).get(savedPostsUrl);
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
