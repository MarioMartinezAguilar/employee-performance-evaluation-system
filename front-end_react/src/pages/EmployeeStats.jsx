import { SideBar } from "../components/SideBar";
import {getEmployeeGenderStats} from "../api/employee";
import { useEffect, useState } from "react";
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import { Footer } from "../components/footer";

const COLORS = [
    '#1E3A8A',
    '334155'
]



export function EmployeeStats(){
    const [genderData, setGenderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{
        const loadData =async()=>{
            try{
                const res = await getEmployeeGenderStats();
                    const formattedData = Object.entries(res.data).map(
                    ([Key,value]) => ({
                        name: Key,
                        value: value
                    })
                )
                  setGenderData(formattedData);

            }catch(error){
                console.log(error);
                setError(true)
            }finally{
                setLoading(false);
            }
            
        }
        loadData();
       
    }, [])
    if (loading) {
        return (
            <h1 className="text-2xl font-bold">Cargando Datos...</h1>
        )
    }
    if (error) {
        return (
            <h1 className="text-2xl font-bold text-red-500">Error al cargar datos</h1>
        )

    }
    /* variable responsive */
    const isMobile = window.innerWidth < 768;
    return (
        <div className="flex flex-col md:flex-row ">
            <SideBar/>
            <div className="flex-1 p-6 min-w-0">
                <h1 className="text-3xl font-bold m-6 text-center">Estadísticas De Empleados</h1>
                <div className='bg-white rounded-2xl shadow-md p-6'>
                    <div className="w-full h-[400px]  min-w-0">
                        
                        <ResponsiveContainer  width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx= "50%"
                                    cy= "50%"
                                    outerRadius={isMobile ? 80 : 120}
                                    label={
                                        !isMobile
                                        ?({name, percent})=>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        : false
                                    }
                                    labelLine={false}
                                    
                                >
                                    {genderData.map(
                                        (entry, index)=>(
                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}

                                </Pie>
                                <Tooltip/>
                                <Legend
                                    formatter={(value, entry) => {
                                        const total = genderData.reduce(
                                            (acc, item) => acc + item.value,
                                                0
                                        );
                                        const percent = (
                                            (entry.payload.value / total) *
                                                100
                                        ).toFixed(0);
                                        return `${value} (${percent}%)`;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>
                <Footer/>
            </div>

        </div>

        
    )
}