import axios from 'axios';
import { API_URL } from './config';

export const loginUser = (userData) =>{
   return axios.post(
         `${API_URL}/token/`,
         userData
   );  
};
