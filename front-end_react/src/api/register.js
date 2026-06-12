import axios  from 'axios';

 const empleadoApi = axios.create({
    baseURL:'http://localhost:8000/api/v1/employees/'
});

export const registrarEmpleado = (empleado) => empleadoApi.post('/', empleado);  

    