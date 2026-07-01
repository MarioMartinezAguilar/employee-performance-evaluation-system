/* import axios from 'axios'
//import { API_URL } from './config';*/

/*const dashboardApi = axios.create({
    baseURL: `${API_URL}/dashboard-stats/`
})

export const getDasboardStats = ()=>{
    return dashboardApi.get('/')

} 
*/
import axiosInstance from './axiosInstance';

    export const getDasboardStats = () => {
        return axiosInstance.get('/dashboard-stats/');
    }; 