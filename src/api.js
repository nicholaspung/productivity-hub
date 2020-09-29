import axios from 'axios';
import { getIdToken } from './firebase/utils';

const baseUrl = 'http://127.0.0.1:8000/api';

export const axiosWithAuth = async () => {
  const token = await getIdToken();
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: baseUrl,
  });
};
