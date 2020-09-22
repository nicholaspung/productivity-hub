import { axiosWithAuth } from "../../api";

const profileUrl = "/profile/";
const userUrl = "/user/";

export const getProfile = async () => {
  try {
    const response = await (await axiosWithAuth()).get(profileUrl);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateProfile = async (id, profile) => {
  try {
    const response = await (await axiosWithAuth()).patch(
      `${profileUrl}${id}/`,
      profile
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getUser = async () => {
  try {
    const response = await (await axiosWithAuth()).get(userUrl);
    return response.data;
  } catch (err) {
    return err;
  }
};
