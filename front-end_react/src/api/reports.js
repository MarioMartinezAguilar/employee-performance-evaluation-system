import axiosInstance from "./axiosInstance";


// creamos la función para descargar el excel
export const downloadEmployeesExcel = () => {
    return axiosInstance.get(
        "/export-employees/",
        {
            responseType: "blob" // no espera json, texto espera un archivo binario porque excel es .xlsx
        }
    );
};