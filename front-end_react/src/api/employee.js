import axios from 'axios';

const employeeStatsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/employee-gender/'
})

export const getEmployeeGenderStats = () => {
    return employeeStatsApi.get('/')
}