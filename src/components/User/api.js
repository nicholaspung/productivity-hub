import { axiosWithAuth } from "../../api";

const profileUrl = "/profile/";
const userUrl = "/user/";

// Only action for async because otherwise it won't work with the way
// onAuthStateChanged is configured
export const getProfile = async () => (await axiosWithAuth()).get(profileUrl);

export const updateProfile = (id, profile) =>
  axiosWithAuth().patch(`${profileUrl}${id}/`, profile);

export const getUser = () => axiosWithAuth().get(userUrl);

export const deleteUser = (id) => axiosWithAuth().delete(`${userUrl}${id}/`);
