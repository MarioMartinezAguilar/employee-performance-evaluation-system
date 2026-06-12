import axios from 'axios';


export const getResults =  async () =>{
     return await axios.get('http://127.0.0.1:8000/api/v1/results/')
    
}