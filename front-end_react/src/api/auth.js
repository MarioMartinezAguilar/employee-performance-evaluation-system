import axios from 'axios';

export const loginUser = (userData) =>{
   return axios.post(
        'http://127.0.0.1:8000/api/v1/token/',
        userData
   );  
};
