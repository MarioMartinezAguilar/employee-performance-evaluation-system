import PropTypes from "prop-types";

export function ProgressBar({total, answered}){
    const progress =  total > 0 ? (answered / total) * 100 : 0;
    //variable para el percentage
    const percentage = Math.round(progress);

    return (
        <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full transition-all duration-300
                    ${progress === 100 ? "bg-green-500" : "bg-blue-600"}`}
                    style={{width: `${progress}%`}}>
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
                    {answered} de {total} preguntas respondidas
            </p>
            <p className="text-xs text-blue-600 text-center font-medium">
                {percentage}% completado
            </p>
        </div>
    )
}

//corrigiendo advertencias
ProgressBar.propTypes = {
    total: PropTypes.number.isRequired,
     answered: PropTypes.number.isRequired,
};


