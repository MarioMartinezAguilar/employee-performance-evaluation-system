import axios from 'axios'

const dashboardApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/dashboard-stats/'
})

export const getDasboardStats = ()=>{
    return dashboardApi.get('/')

}