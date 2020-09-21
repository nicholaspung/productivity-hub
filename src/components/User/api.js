import { axiosWithAuth } from "../../api";

export const getProfile = async () => {
  try {
    const response = await (await axiosWithAuth()).get("/profile/");
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getUser = async () => {
  try {
    const response = await (await axiosWithAuth()).get("/user/");
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
