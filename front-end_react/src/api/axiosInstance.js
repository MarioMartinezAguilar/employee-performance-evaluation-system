import axios from "axios";
import { API_URL } from "./config";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Interceptor para enviar JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para renovar token automáticamente este interceptor se ejecuta después de recibir una respuesta
axiosInstance.interceptors.response.use(
    (response) => response,
    //se ejecuta cundo Django devuelve un error
    async (error) => {

        const originalRequest = error.config;
        // pregunta el error fue 401
        if (
            error.response?.status === 401 &&
            !originalRequest._retry // todavía no intente renovarlo
        ) {

            originalRequest._retry = true; // ya intente renovar el token una vez evitamos bucles infinitos

            try {

                const refreshToken =
                    localStorage.getItem("refreshToken");

                const response = await axios.post( //llamamos a ruta token/refresh
                    `${API_URL}/token/refresh/`,
                    {
                        refresh: refreshToken // envía el refresh token
                    }
                );

                const newAccessToken = // guardamos el nuevo token
                    response.data.access;

                localStorage.setItem( // aquí reemplazamos el token viejo
                    "accessToken",
                    newAccessToken
                );
                // actualizamos la cabecera
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest); // repite la petición pero usando el token nuevo

            } catch (refreshError) { // si el refresh token falla o expire o es invalido 

                localStorage.removeItem("accessToken"); // borramos token del local Storage
                localStorage.removeItem("refreshToken");

                window.location.href = "/login"; // con esto enviamos a login cuando ya no es posible generar mas tokens

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;