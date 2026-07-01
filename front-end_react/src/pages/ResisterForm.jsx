import  {useForm} from 'react-hook-form';
import { registrarEmpleado } from '../api/register';
import {  useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Header } from '../components/Header'
import { ConfirmModal } from '../components/ConfirmModal';
import { Footer } from '../components/footer';


export function RegisterForm(){
   // para agregar el loading...
   const [loading, setLoading] = useState(false);
   // estado para ventana modal
   const [showModal, setShowModal] = useState(false);
    const { register, watch ,handleSubmit, reset, formState:{ isValid }} = useForm({
        mode: "onChange"
    });
    
    const navigate = useNavigate();
    //funciones de la ventana Modal
    //function que abre el modal
    const handleCancel = () =>{
        setShowModal(true);
    };
    //function de confirmar cancelación
    const confirmCancel = () =>{
        reset();
        setShowModal(false);
    };
    //function para
    const closeModal=() =>{
        setShowModal(false);
    } 

    useEffect(() => {
        localStorage.removeItem("id");
    }, []);
    
    

    const onSubmit = handleSubmit( async data =>{
        try{
            // usamos el setLoading
            setLoading(true);
            const res = await registrarEmpleado(data);
            //console.log(res.data);
            localStorage.setItem("id", res.data.id);
            toast.success('Empleado Registrado Exitosamente', {
                style: {
                    background: "#1080e9",
                    color: '#e4dfdf'
                }
            });
            navigate('/questions');
        }catch(error){
            console.error("ERROR:", error.response?.data || error);
            toast.error("Ocurrió un error al registrar el empleado");
        } finally {
            setLoading(false);
        }
    });


    return(
        <div className="min-h-screen bg-gray-100">
            <Header />
            
            <main className="flex items-center justify-center py-10">
                <div className='bg-white p-8 rounded-2x1 shadow-md w-full max-w-md'>
                    <h1 className="text-2x1 font-bold mb-4 text-center text-gray-800"> REGISTRO DEL EMPLEADO</h1>
                    <form onSubmit ={onSubmit}>
                        {/* mostrar el mensaje general */}
                        {!isValid && (
                            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4
                                            text-sm flex items-center gap-3">
                               ⚠️ <span>Debes LLenar Todos Los Campos Para Tu Registro</span> 
                            </div>
                    )}
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Del Empleado: </label>
                            <input id ="nombre"type="text" placeholder="Ingresa tu nombre"
                                {...register('name', {required: true})}
                                className='w-full border border-gray-300 rounded-lg 
                                p-1.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                                placeholder-gray-300'
                            />
                            
                        <label htmlFor="puesto" className="block text-sm font-medium text-gray-700 mb-1">Puesto Del Empleado: </label> 
                            <input id="puesto" type="text"placeholder="Ingresa el puesto de trabajo"
                                {...register('job_position', {required: true})}
                                className='w-full border border-gray-300 rounded-lg 
                                p-1.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                                placeholder-gray-300'
                            />
                            
                        <label htmlFor="nomina" className="block text-sm font-medium text-gray-700 mb-1">Número De Tu Nómina:</label>
                            <input id="nomina" type="text" placeholder="Ingresa el número de tu nómina" 
                                {...register('payroll_number', {required: true})}
                                className='w-full border border-gray-300 rounded-lg 
                                p-1.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                                placeholder-gray-300'

                            />
                            
                        <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">Selecciona Tu Sexo:</label>
                        <div className="relative mb-4">
                            <select id="sexo" {...register('gender', {required: true})}
                            defaultValue=""
                            className={`w-full border border-gray-300 rounded-lg p-1.5 bg-white appearance-none mb-2 focus:outline-none  
                            focus:ring-2 focus:ring-blue-500 transition 
                            ${(watch('gender') || "") === "" ? 'text-gray-300' : 'text-gray-800'}`}>
                                <option value="" disabled hidden >Selecciona una opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            <span className='absolute right-3 top-2 text-gray-600 pointer-events-none'>▼</span>
                        </div>                            
                        <label htmlFor="sindicato" className="block text-sm font-medium text-gray-700 mb-1">Sección Del Sindicato:</label>
                            <input id="sindicato" type="text" placeholder="Ingresa Tu Sección De Sindicato" 
                                {...register('union_number', {required: true})}
                                className='w-full border border-gray-300 rounded-lg 
                                p-1.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                                placeholder-gray-300'
                            /> 
                            
                            <button  type="submit" disabled={!isValid || loading}
                            className="w-full bg-blue-700 text-white rounded-lg py-2 
                            hover:bg-blue-800 transition duration-200 disabled:bg-gray-400
                            disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                            {loading && (
                                <span className='w-4 h-4 border-2 border-white border-t-transparent 
                                rounded-full animate-spin duration-500'></span>
                            )} 
                                {loading 
                                ? "Registrando..." 
                                : !isValid 
                                ? "Completa Tu Registro" 
                                : "Registrar" }
                            </button>
                            <button type='button' onClick={handleCancel} disabled={loading}
                            className="w-full bg-red-600 text-white py-2 rounded-lg mt-2 hover:bg-red-700 transition duration-200">
                                Cancelar Registro
                            </button>
                    </form>
                </div>
            </main>
             <ConfirmModal 
                isOpen={showModal}
                onClose={closeModal}
                onConfirm={confirmCancel}
                title="Cancelar Registro"
                message="¿Seguro que deseas cancelar el registro?"
             />
             <Footer/>
        </div>
        
    )
}