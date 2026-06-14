import axios from 'axios';
import { API_URL } from './config';


export const getResults =  async () =>{
     return await axios.get(`${API_URL}/results/`)
    
}