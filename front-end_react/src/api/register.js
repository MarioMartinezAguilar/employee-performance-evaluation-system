import axios  from 'axios';
import { API_URL } from './config';

 const empleadoApi = axios.create({
    baseURL:`${API_URL}/employees/`
});

export const registrarEmpleado = (empleado) => empleadoApi.post('/', empleado);  

    