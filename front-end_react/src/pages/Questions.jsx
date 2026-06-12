import { getQuestions , sendResponses } from "../api/questions";
import { useEffect , useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from 'react-router-dom';
import  {Header} from '../components/Header';
import { ConfirmModal } from "../components/ConfirmModal";
import {ProgressBar} from "../components/ProgressBar";
import {Footer} from '../components/footer';



export function Questions (){
    const [questions, setQuestions ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // vamos a usar el hook-form
    const {
        register, 
        handleSubmit,
        watch,
        formState:{isValid}
    } = useForm({
        mode: "onChange",
        defaultValues: {}
        
    });
    const navigate = useNavigate()
    const formValues = watch();
    const hasAnswers = Object.values(formValues).some(Boolean);

    useEffect(() =>{
        async function loadQuestions(){
            const res = await getQuestions();
            //console.log(res)
            setQuestions(res.data);

        }
        loadQuestions();
    }, []);
    //función para cancelar encuesta
    const handleCancelSurvey = () =>{
        if(hasAnswers){
            setShowModal(true);
            /* const confirmCancel = window.confirm(
                "Ya comenzaste la encuesta. ¿Seguro que deseas cancelarla?"
            ); */
            /* if(!confirmCancel) return; */
        }else {
            localStorage.removeItem('id');
            navigate('/');
        }
        
    };
    //function para confirmar el modal
    const confirmCancelSurvey = ()=>{
        localStorage.removeItem('id');
        navigate('/')
    };
    //function para cerrar el modal
    const closeModal = ()=>{
        setShowModal(false);
    }



    // function que va enviar los datos
    const onSubmit = async (data) =>{
        try {
            setLoading(true);
            const employeeId = localStorage.getItem('id');

            //trasformación de datos para que los reciba el back-end
            const formateo = Object.entries(data).map(([question,choice]) => ({
                //object.entries convierte esto {"1": "3"} a esto [["1", "3"]]
                //aquí creamos un objeto nuevo para mandarlo
                employee: Number(employeeId),
                question: Number(question),
                choice: Number(choice)
                // es Number por que el back-end espera datos numéricos por el hook de 
                // form guarda todo en formato string
                //aquí armamos el objeto { employee: 1, question: 1, choice: 3 }
            }));
            //console.log('Preparando para enviar:', formateo);
            await sendResponses(formateo); 
            //alert("Respuestas enviadas");
            localStorage.removeItem('id'); //limpiamos el LocalStorage
            navigate('/thanks');

        } catch (error) {
            console.error("ERROR BACKEND:", error.response.data);
            /* console.error(error.response?.data || error); */
            //aquí en el catch se ejecuta si algo falla
            //error.response? -> si el error viene del back-end muéstrelo en Django
            // si no hay respuesta muestra el error en general || error
        } finally {
            setLoading(false);
        }
        
    }
    // variables para la barra de progreso
    const totalQuestions = questions.length;
    const answeredQuestions = Object.values(formValues).filter(Boolean).length


    return(
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Evaluación De Desempeño Laboral</h1>
                    <div className="sticky top-10 z-40 bg-blue-50 py-3 rounded">
                        <ProgressBar
                        total={totalQuestions}
                        answered={answeredQuestions}
                     />
                    </div>
                    <p className="text-center text-gray-500 mb-6">Responde las siguientes preguntas</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* mostrar el mensaje general */}
                        {!isValid&& (
                            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4
                                            text-sm flex items-center gap-3">
                                    ⚠️ <span>Debes Responder Todas Las preguntas</span>
                            </div>
                            
                        )}
                        {/* //primera tarjeta */}
                        <div className="bg-blue-50 rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Datos Generales</h2>
                        
                            {questions.slice(0,2).map((question)=>(
                                <div key={question.id} className="mb-6">
                                    <p className="font-bold text-gray-700 mb-3">{question.question_text}</p>
                                    <div className="space-y-2">
                                        {question.choices.map((choice)=>(
                                            <label key={choice.id} 
                                                    className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer
                                                         transition-all duration-200 hover:scale-[1.01]
                                                        ${formValues[question.id] == choice.id 
                                                        ?" bg-blue-100 border border-blue-500" 
                                                        :" hover:bg-gray-100 border border-transparent"}
                                                    `}>
                                                <input 
                                                    type="radio" 
                                                    value={choice.id}
                                                    {...register(String(question.id), {required: true})}
                                                    className="mt-1.5 accent-blue-600" 
                                                />
                                                <span>{choice.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* segunda tarjeta */}
                        <div className="bg-blue-50 rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Desempeño Laboral</h2>
                        
                            {questions.slice(2,7).map((question)=>(
                                <div key={question.id} className="mb-6">
                                    <p className="font-bold text-gray-700 mb-3">{question.question_text}</p>
                                    <div className="space-y-2">
                                        {question.choices.map((choice)=>(
                                            <label key={choice.id} className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer
                                                         transition-all duration-200 hover:scale-[1.01]
                                                        ${formValues[question.id] == choice.id 
                                                        ?" bg-blue-100 border border-blue-500" 
                                                        :" hover:bg-gray-100 border border-transparent"}
                                                    `}>
                                                <input 
                                                    type="radio" 
                                                    value={choice.id}
                                                    {...register(String(question.id), {required: true})}
                                                    className="mt-1.5 accent-blue-600" 
                                                />
                                                <span>{choice.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* tercera tarjeta(la ultima) */}
                        <div className="bg-blue-50 rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Entorno y Apoyo</h2>
                        
                            {questions.slice(7).map((question)=>(
                                <div key={question.id} className="mb-6">
                                    <p className="font-bold text-gray-700 mb-3">{question.question_text}</p>
                                    <div className="space-y-2">
                                        {question.choices.map((choice)=>(
                                            <label key={choice.id} className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer
                                                         transition-all duration-200 hover:scale-[1.01]
                                                        ${formValues[question.id] == choice.id 
                                                        ?" bg-blue-100 border border-blue-500" 
                                                        :" hover:bg-gray-100 border border-transparent"}
                                                    `}>
                                                <input 
                                                    type="radio" 
                                                    value={choice.id}
                                                    {...register(String(question.id), {required: true})}
                                                    className="mt-1.5 accent-blue-600" 
                                                />
                                                <span>{choice.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 mt-6">    
                            <button type="submit" disabled={!isValid || loading} 
                            className="w-full bg-blue-700 text-white py-2 rounded-lg
                            hover:bg-blue-800 transition duration-200 disabled:bg-gray-400 
                            disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <span className="animate-spin h-4 w-4 border-2
                                             border-white border-t-transparent rounded-full"></span>
                                        Enviando... 
                                    </>
                                ) :(
                                    !isValid? 'Responde Todas Las Preguntas' : 'Terminar Y Registrar'
                                )}
                            </button>
                            <button type="button" 
                                onClick={handleCancelSurvey} 
                                disabled={loading}
                                className="w-full bg-red-500 text-gray-800 py-2 rounded-lg 
                                         hover:bg-red-600 transition duration-200
                                          disabled:cursor-not-allowed">Cancelar Encuesta</button>
                        </div>
                    </form>
                    <ConfirmModal
                        isOpen={showModal}
                        onClose={closeModal}
                        onConfirm={confirmCancelSurvey}
                        title= 'Cancelar encuesta'
                        message= 'Ya comenzaste la encuesta. ¿Seguro que deseas cancelarla?'
                    
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}