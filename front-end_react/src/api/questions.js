import axios from 'axios';

const questionApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1/questions/'
});

export const getQuestions = () => questionApi.get('/');

export const sendResponses = (data) => {
  return axios.post('http://localhost:8000/api/v1/answer/', data);
};