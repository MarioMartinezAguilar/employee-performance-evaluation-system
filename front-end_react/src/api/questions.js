import axios from 'axios';
import { API_URL } from './config';
const questionApi = axios.create({
  baseURL: `${API_URL}/questions/`
});

export const getQuestions = () => questionApi.get('/');

export const sendResponses = (data) => {
  return axios.post(`${API_URL}/answer/`,data);
};