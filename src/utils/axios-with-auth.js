import axios from 'axios';
import { auth } from '../firebase';

export const axiosWithAuth = async () => {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
