import axios from 'axios';
import { API_URL } from './config';

const employeeStatsApi = axios.create({
    baseURL: `${API_URL}/employee-gender/`
})

export const getEmployeeGenderStats = () => {
    return employeeStatsApi.get('/')
}