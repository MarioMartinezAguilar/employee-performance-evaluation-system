import { useForm } from "react-hook-form";
import { loginUser } from '../api/auth';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-hot-toast';



export function Login(){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const onSubmit = async (data) =>{
        setLoginError("");
        try{
            const response = await loginUser(data);
            //console.log(response.data);
            localStorage.setItem(
                'accessToken',
                response.data.access
            );
            localStorage.setItem(
                'refreshToken',
                response.data.refresh
            );
            toast.success('Inicio de sesión exitoso', {
                style: {
                    background: "#1080e9",
                    color: '#e4dfdf'
                }
            });
            //console.log("Login Exitoso");
            navigate("/dashboard");
        }catch (error){
            if(error.response?.status === 401){

                setLoginError("Usuario o contraseña incorrectos");
            }else{
                setLoginError("Ocurrió un error inesperado");
            }
            
        }
        
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Iniciar Sesión
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            className="block text-gray-700 mb-2 text-2xl  font-bold" 
                            htmlFor="usuario">Usuario:
                        </label>
                        <input
                            id="usuario" 
                            type="text"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Ingresa Tu Usuario"
                            {...register("username",{
                                required: 'El usuario es obligatorio'
                            })}
                            
                        />
                        {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                            )}

                        <div>
                            <label
                                className="block text-gray-700 mb-2 text-2xl  font-bold" 
                                htmlFor="password">Contraseña:
                            </label>
                            <input type="password" id="password"
                                className="w-full border rounded-lg p-3  focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Ingresa Tu Contraseña"
                                {...register('password', {
                                    required: "La contraseña es obligatoria"
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        {loginError && (
                            <p className="text-red-600 text-sm text-center">{loginError}</p>
                        )}
                        <button 
                            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-3
                                 hover:bg-blue-700 transition font-bold"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}