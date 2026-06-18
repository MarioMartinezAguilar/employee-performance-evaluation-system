import { SideBar } from "../components/SideBar";
import { useState, useEffect } from "react";
import { getDasboardStats } from "../api/dashboard";
import {getEmployeeGenderStats} from "../api/employee";
import jsPDF from 'jspdf';
import  logo  from '../assets/logo.png';
import { API_URL } from '../api/config';



export function Reports(){
    const [stats, setStats] = useState({
        employees: 0,
        questions: 0,
        answers: 0
    })
    const [genderStats,setGenderStats] =useState({
        Masculino: 0,
        Femenino:0
    })
    useEffect( () => {
        const loadStats = async () => {
            try{
                const res = await getDasboardStats();
                setStats(res.data);
                //console.log(res.data);
                const genderRes = await getEmployeeGenderStats();
                setGenderStats(genderRes.data)
            }catch(error){
                console.log(error);
            }
        }
        loadStats()

    }, [])

    //function para convertir la imagen
    const loadImage = (src) => {
        return new Promise((resolve)=>{
            const img = new Image()
            img.src = src;
            img.onload = () => resolve(img)
        })
    }

    const generatePDF = async () =>{
        const doc = new jsPDF();
        const today = new Date().toLocaleDateString();
        const img = await loadImage(logo);
        doc.addImage(
            img,
            'PNG',
            15,
            15,
            25,
            25
        )
        //encabezado
        doc.setFontSize(18)
        doc.setFont('helvetica','bold')
        doc.text(
            'PRESIDENCIA MUNICIPAL',
            105,
            20,
            {align: 'center'}
        )
        doc.setFontSize(14)
        doc.text(
            'SISTEMA DE ENCUESTAS',
            105,
            30,
            {align: 'center'}
        )
        doc.setFontSize(12)
        doc.text(
            'REPORTE GENERAL',
            105,
            40,
            {align: 'center'}
        )
        doc.setFont('helvetica','normal')
        doc.line(
            20,
            55,
            190,
            55
        )
        doc.text(
            `Fecha: ${today}`,
            20,
            65
        )
        doc.text(
            `Empleados Registrados: ${stats.employees}`,
            20,
            85
        )
        doc.setFont('helvetica', 'bold')
        doc.text(
            'Distribución Por Género',
            20,
            95
        )
        doc.setFont('helvetica', 'normal')
        doc.text(
            `Masculino: ${genderStats?.Masculino ?? 0}`,
            30,
            105
        )
        doc.text(
            `Femenino: ${genderStats?.Femenino ?? 0}`,
            30,
            115
        )

        doc.text(
            `Preguntas De La Encuesta: ${stats.questions}`,
            20,
            130
        )
        doc.text(
            `Respuestas Totales: ${stats.answers}`,
            20,
            140
        )
        doc.save('reporte-encuesta.pdf');
    }
    //function para guardar el Excel
    const downloadExcel = () => {
        window.open(
            `${API_URL}/export-employees/`,'_blank'
        )
    }


    return(
        <div className="flex flex-col md:flex-row">
            <SideBar/>
            <div className="flex-1 p-6 min-h-screen bg-gray-200">
                <h1 className="text-3xl font-bold m-6 text-center">Reportes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-2xl text-center font-bold mb-3">Reporte PDF</h2>
                        <p className="text-gray-500 mb-6">Descargar resultados de la encuesta en formato PDF.</p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3
                                rounded-lg transition" onClick={generatePDF}>
                            Descargar PDF
                        </button>

                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-2xl text-center font-bold mb-3">Exportar Empleados</h2>
                        <p className="text-gray-500 mb-6">Descargar listado completo de empleados en formato Excel.</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3
                                rounded-lg transition" onClick={downloadExcel}>
                            Exportar Excel
                        </button>

                    </div>
                </div>

            </div>
            
        </div>
        
    )
}