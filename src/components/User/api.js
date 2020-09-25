import { axiosWithAuth } from "../../api";

const profileUrl = "/profile/";
const userUrl = "/user/";

export const getProfile = async () => (await axiosWithAuth()).get(profileUrl);

export const updateProfile = async (id, profile) =>
  (await axiosWithAuth()).patch(`${profileUrl}${id}/`, profile);

export const deleteUser = async (id) =>
  (await axiosWithAuth()).delete(`${userUrl}${id}/`);
