import { getDasboardStats } from "../api/dashboard";
import { getResults } from "../api/results";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
// importaciones para generar la gráfica
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
// BarChart->gráfica, Bar->barras,XAxis->ejeHorizontal,YAxis->ejeVertical,Tooltip->hover,ResponsiveContainer->responsive
import {Footer} from "../components/footer";
export function Dashboard() {

    const [stats, setStates] = useState({
        employees: 0,
        questions: 0,
        answers: 0
    })
    const [charts, setCharts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    //const[questionTitle, setQuestionTitle] = useState('');
    const COLORS = [
        '#2563EB',
        '#16A34A',
        '#DC2626',
        '#CA8A04',
        '#9333EA',
        '#EA580C'
    ]
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getDasboardStats();
                setStates(res.data);
                const resultsRes = await getResults();
                const formattedCharts = Object.entries(   //Object.entries(convertimos json en arreglo de objecto)
                    resultsRes.data
                ).map(([question, choices]) => ({ //map recorre cada pregunta
                    question,
                    data: Object.entries(choices).map( //creamos un objeto y lo convertimos array
                        ([name, value]) => ({  //hacemos otro map para el name y el valor(valores del radio)
                            name,
                            value
                        })
                    )
                }))
                setCharts(formattedCharts);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false)
            }
        }
        //transformar la data
        //const firstQuestion = Object.keys(resultsRes.data)[0];
        //setQuestionTitle(firstQuestion);
        //const choices = resultsRes.data[firstQuestion]; // con entries convierte objeto -> arreglo
        /* const formattedData = Object.entries(choices).map(
            ([name, value]) => ({
                name,
                value
            })
        ) */
        //setCharData(formattedData);
        loadData()
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
    const isMobile = window.innerWidth < 768;

    return (
        <div className="flex flex-col md:flex-row overflow-x-hidden">
            <SideBar />
            <div className="flex-1 p-6 min-h-screen ">
                <div className=" bg-gray-200 p-6">  {/* min-h-screen es altura completa */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> {/* title grande */}
                        Dashboard Administrativo
                    </h1>
                    {/* tarjetas de resumen */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-white rounded-xl shadow p-6 ">
                            <h2 className="text-gray-500 text-sm font-medium">
                                Empleados
                            </h2>
                            <p className="text-3xl font-bold text-blue-700">
                                {stats.employees}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-gray-500 text-sm font-medium">
                                Encuesta
                            </h2>
                            <p className="text-3xl font-bold text-green-700">
                                {stats.questions}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-gray-500 text-sm font-medium">
                                Respuestas
                            </h2>
                            <p className="text-3xl font-bold text-purple-700">
                                {stats.answers}
                            </p>
                        </div>
                    </div>
                    {/* apartado para las gráficas */}
                    <div className="bg-white rounded-xl shadow p-6 mt-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold">Resultados De La Encuesta</h1>
                            <p className="text-gray-500 mt-2">Estadísticas Generales</p>
                        </div>
                        {/* <h2 className="text-xl text-gray-700 text-center font-bold mb-4">
                        {questionTitle}
                </h2> */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {charts.map((chart, index) => (
                                <div key={index} className="bg-gray-100 p-6 rounded-xl mb-8">
                                    <h2 className="text-xl font-bold mb-6">
                                        {chart.question}
                                    </h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chart.data} layout="vertical">
                                            <XAxis type="number" domain={[0, 'dataMax + 1']} />
                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                                width={isMobile ? 100 : 180}
                                                tickFormatter={(value) =>
                                                    isMobile && value.length > 10
                                                    ? value.substring(0, 10) + "..."
                                                    : value
                                                }
                                                

                                            />
                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-white p-3 border rounded shadow max-w-xs">
                                                                <p className="break-words">
                                                                    {payload[0].payload.name}
                                                                </p>
                                                                <p>
                                                                    Total: {payload[0].value}
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                             />
                                            <Bar dataKey="value">
                                                {chart.data.map((entry, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            COLORS[index % COLORS.length]
                                                        }
                                                    />
                                                ))}
                                                <LabelList dataKey="value" position="right" />
                                            </Bar>

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            
        </div>







    )
}