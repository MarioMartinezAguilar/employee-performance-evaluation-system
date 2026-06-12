import { useNavigate } from "react-router-dom";




export function Thanks() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500 px-4">
            <div className="backdrop-blur-md bg-white/20 border border-white/30 
                            rounded-xl p-8 max-w-md w-full text-center shadow-xl">
                <div className="flex justify-center mb-4">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-400/20 rounded-full p-4 ">

                            <svg
                                className="w-12 h-12"
                                viewBox="0 0 52 52"
                                >
                                {/* CÍRCULO */}
                                <circle
                                    cx="26"
                                    cy="26"
                                    r="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="text-green-300 stroke-[4]"
                                    strokeDasharray="150"
                                    strokeDashoffset="150"
                                >
                                    <animate
                                    attributeName="stroke-dashoffset"
                                    from="150"
                                    to="0"
                                    dur="0.4s"
                                    fill="freeze"
                                    />
                                </circle>

                                {/* CHECK */}
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    d="M14 27l7 7 16-16"
                                    className="text-green-200"
                                    strokeDasharray="50"
                                    strokeDashoffset="50"
                                >
                                    <animate
                                    attributeName="stroke-dashoffset"
                                    from="50"
                                    to="0"
                                    dur="0.3s"
                                    begin="0.4s"
                                    fill="freeze"
                                    />
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                    <h1 className="text-xl font-semibold text-white mb-2">¡Registro Completado!</h1>
                    <p className="text-gray-200 mb-6">Tus respuestas han sido registradas correctamente. Gracias por participar en la evaluación</p>
                    <button
                    onClick={()=> navigate('/')}
                    className="w-full bg-white font-semibold text-blue-700 py-2 rounded-lg 
                    hover:bg-gray-300 transition duration-200"
                    >Volver al inicio</button>
            </div>
            
        </div>
        

    );
}