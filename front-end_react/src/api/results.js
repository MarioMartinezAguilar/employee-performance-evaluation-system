/* import axios from 'axios';
import { API_URL } from './config';


export const getResults =  async () =>{
     return await axios.get(`${API_URL}/results/`)
    
} */

import axiosInstance from './axiosInstance';

export const getResults = () => {
    return axiosInstance.get('/results/');
};